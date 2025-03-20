package com.exampleElecti.Electi.controller;

import com.exampleElecti.Electi.model.ApiResponse;
import com.exampleElecti.Electi.model.Political_Party;
import com.exampleElecti.Electi.model.User;
import com.exampleElecti.Electi.repository.Political_PartyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/political_party")
public class Political_PartyController {

    //Repository and upload directory
    private final Political_PartyRepository political_party_repository;
    public static final String uploadDirectory = System.getProperty("user.dir") + "/uploads";

    //Constructor
    @Autowired
    public Political_PartyController(Political_PartyRepository politicalPartyRepository) {
        political_party_repository = politicalPartyRepository;
    }

    //Returns all the parties
    @GetMapping
    public List<Political_Party> political_parties(){
        return political_party_repository.findAll();
    }

    @GetMapping("/{id}")//Find the political_party by their Id
    public ResponseEntity<Political_Party> getPolitical_PartyId(@PathVariable String id){
        Optional<Political_Party> political_party = political_party_repository.findById(id);
        return political_party.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")//Adds a new political party
    public ResponseEntity<?> add(//Params
            @RequestParam("name") String name,
            @RequestParam("long_name") String long_name,
            @RequestParam(value = "image", required = false) MultipartFile file) {

        // Verifies if exist
        if (political_party_repository.findByName(name).isPresent()) {
            return new ResponseEntity<>(
                    new ApiResponse("Ya se encuentra ese partido!"),
                    HttpStatus.CONFLICT
            );
        }

        // Creates a new party
        Political_Party partyToInsert = new Political_Party();
        partyToInsert.setName(name);
        partyToInsert.setLong_name(long_name);

        //If an image is retrieved
        if (file != null && !file.isEmpty()) {
            try {//Proccess to upload an image same as article controller
                Files.createDirectories(Paths.get(uploadDirectory));
                String newName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                Path fileNameAndPath = Paths.get(uploadDirectory, newName);
                Files.write(fileNameAndPath, file.getBytes());
                partyToInsert.setImage_url(fileNameAndPath.toString());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error al subir la imagen: " + e.getMessage());
            }
        }

        // Saves the political party
        political_party_repository.save(partyToInsert);

        return new ResponseEntity<>(
                new ApiResponse("Partido creado con éxito", partyToInsert),//Creates the party
                HttpStatus.CREATED
        );
    }

    @GetMapping("/image/{id}")//Retrieves the image from the party if exists, sames as article controller
    public ResponseEntity<byte[]> getImageById(@PathVariable String id) {
        Optional<Political_Party> political_party = political_party_repository.findById(id);

        if (political_party.isEmpty() || political_party.get().getImage_url() == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            Path imagePath = Paths.get(political_party.get().getImage_url());

            if (!Files.exists(imagePath)) {
                return ResponseEntity.notFound().build();
            }

            byte[] imageBytes = Files.readAllBytes(imagePath);
            return ResponseEntity.ok()
                    .header("Content-Type", Files.probeContentType(imagePath))
                    .body(imageBytes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

}