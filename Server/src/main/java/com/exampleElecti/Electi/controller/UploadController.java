package com.exampleElecti.Electi.controller;

import com.exampleElecti.Electi.model.User;
import com.exampleElecti.Electi.repository.UserRepository;
import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

/*
*
* About: Controller to allow images uploads
*
* */

@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = "http://localhost:8081")
public class UploadController {

    private final UserRepository userRepository;

    @Autowired
    public UploadController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    //Set the directory intended for uploads
    public static final String uploadDirectory = System.getProperty("user.dir") + "/uploads";

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> getImage(@PathVariable Integer id){
        try{

            Optional<User> optionalUser = userRepository.findById(id);//Searches the user by Id
            if(!optionalUser.isPresent()){
                return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            User user = optionalUser.get();//Gets the user
            String imagePath = user.getImageUrl();//Gets the imagePath

            Path path = Paths.get(imagePath);//Gets the Path by setting the path from the user

            if(!Files.exists(path)){//Verifies if the file exists in the file system
                return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            FileInputStream fileInputStream = new FileInputStream(path.toFile());//Creates a path from the path retrieved
            Resource resource = new InputStreamResource(fileInputStream);//Creates the input stream that makes possible to send via HTTP

            return ResponseEntity.ok()//Build the response ok
                    .contentType(MediaType.IMAGE_JPEG)//Sets the content media to jpeg
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + path.getFileName().toString())//Set the headers
                    .body(resource);//Set the body with the resource get

        } catch (Exception e){//Throws an exception
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PatchMapping("/upload/{id}")
        public ResponseEntity<String> uploadImage(@RequestParam("image")MultipartFile file, @PathVariable Integer id){//Requesting the param of an image
            try{
                if(file.isEmpty()){//Validating the file isnt empty, if it is empty return error
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al subirse la imagen");
                }

                Optional<User> optionalUser = userRepository.findById(id);
                if(!optionalUser.isPresent()){
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontro al usuario");
                }

                //Creates directory if it doesn't exist
                Files.createDirectories(Paths.get(uploadDirectory));

                //NewName for the file
                String newName = id.toString() + "_userFile_" + file.getOriginalFilename();

                //Creates a Path object with the directory and the filename
                Path fileNameAndPath = Paths.get(uploadDirectory, newName);

                //Writes the image to the path
                Files.write(fileNameAndPath, file.getBytes());

                //Updates the user
                User user = optionalUser.get();
                user.setImageUrl(fileNameAndPath.toString());
                userRepository.save(user);

                //Returns a confirmation message
                return ResponseEntity.status(HttpStatus.OK).body("Imagen subida con exito");

            } catch (Exception e){//Catch any error and return a https response
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error el subir la imagen " + e.getMessage());
            }
        }



}
