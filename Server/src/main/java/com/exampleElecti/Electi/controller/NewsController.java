package com.exampleElecti.Electi.controller;


import com.exampleElecti.Electi.model.ApiResponse;
import com.exampleElecti.Electi.model.News;
import com.exampleElecti.Electi.model.User;
import com.exampleElecti.Electi.repository.NewsRepository;
import com.exampleElecti.Electi.repository.UserRepository;
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
@RequestMapping("/api/news")
public class NewsController {

    //Repositories and upload directory
    private final NewsRepository newsRepository;
    private final UserRepository userRepository;
    public static final String uploadDirectory = System.getProperty("user.dir") + "/uploads";

    //Constructor
    @Autowired
    public NewsController(NewsRepository newsRepository, UserRepository userRepository) {
        this.newsRepository = newsRepository;
        this.userRepository = userRepository;
    }

    @GetMapping//Returns all the news
    public List<News> news(){//Returns all the users on the database
        return newsRepository.findAll();
    }

    @GetMapping("/{id}")//Find the user by their Id
    public ResponseEntity<News> getNewsId(@PathVariable Long id){
        Optional<News> news = newsRepository.findById(id);
        return news.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(//Request params to add an article
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("user_id") Long user_id,
            @RequestParam(value = "image", required = false) MultipartFile file) {

        //Verifies if the news exists
        if (newsRepository.findByTitle(title).isPresent()) {
            return new ResponseEntity<>(new ApiResponse("Ya se encuentra esa noticia!"), HttpStatus.CONFLICT);
        }

        //Finds user in database by repository search id
        User user = userRepository.findById(user_id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        //Creates the news
        News newsToInsert = new News();
        newsToInsert.setTitle(title);
        newsToInsert.setDescription(description);
        newsToInsert.setUser(user); // Asigna el usuario en lugar de un ID

        // If files is not null and is not empty
        if (file != null && !file.isEmpty()) {
            try {
                Files.createDirectories(Paths.get(uploadDirectory));//Gets the upload directory
                String newName = System.currentTimeMillis() + "_" + file.getOriginalFilename();//Writes a new name
                Path fileNameAndPath = Paths.get(uploadDirectory, newName);//Creates a path based on new Name and path
                Files.write(fileNameAndPath, file.getBytes());//Writes the file from the path and the bytes
                newsToInsert.setImage_url(fileNameAndPath.toString());//Set the image url to the article
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)//Throws and internal sever erro 500
                        .body("Error al subir la imagen: " + e.getMessage());
            }
        }

        // Saves the article
        newsRepository.save(newsToInsert);

        //Return created 201
        return new ResponseEntity<>(new ApiResponse("Articulo creado con éxito", newsToInsert), HttpStatus.CREATED);
    }


    //Retrieves the image based on the news ID
    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getImageById(@PathVariable Long id) {
        Optional<News> news = newsRepository.findById(id);//Finds the article by Id

        if (news.isEmpty() || news.get().getImage_url() == null) {//If not found
            return ResponseEntity.notFound().build();
        }

        try {
            Path imagePath = Paths.get(news.get().getImage_url());//Gets the image path

            if (!Files.exists(imagePath)) {//If file doesn't exist
                return ResponseEntity.notFound().build();
            }

            byte[] imageBytes = Files.readAllBytes(imagePath);
            return ResponseEntity.ok()//Set up the response entity with a content type and the imagebytes as response
                    .header("Content-Type", Files.probeContentType(imagePath))
                    .body(imageBytes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)//Throws an error
                    .body(null);
        }
    }

}
