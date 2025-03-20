package com.exampleElecti.Electi.controller;

import com.exampleElecti.Electi.model.ApiResponse;
import com.exampleElecti.Electi.model.Article;
import com.exampleElecti.Electi.model.Political_Party;
import com.exampleElecti.Electi.model.User;
import com.exampleElecti.Electi.repository.ArticleRepository;
import com.exampleElecti.Electi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/article")
public class ArticleController {

    //Repositories and uploadDirectory for image upload
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    public static final String uploadDirectory = System.getProperty("user.dir") + "/uploads";

    @Autowired//Constructor
    public ArticleController(ArticleRepository articleRepository, UserRepository userRepository) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
    }

    @GetMapping//Returns all the articles
    public List<Article> articles(){//Returns all the users on the database
        return articleRepository.findAll();
    }

    @GetMapping("/{id}")//Find the user by their Id
    public ResponseEntity<Article> getArticleId(@PathVariable Long id){
        Optional<Article> article = articleRepository.findById(id);
        return article.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(//Request params to add an article
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("user_id") Long user_id,
            @RequestParam(value = "image", required = false) MultipartFile file) {

        //Verifies if the article exists
        if (articleRepository.findByTitle(title).isPresent()) {
            return new ResponseEntity<>(new ApiResponse("Ya se encuentra ese articulo!"), HttpStatus.CONFLICT);
        }

        //Finds user in database by repository search id
        User user = userRepository.findById(user_id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        //Creates the new article
        Article articleToInsert = new Article();
        articleToInsert.setTitle(title);
        articleToInsert.setDescription(description);
        articleToInsert.setUser(user); // Asigna el usuario en lugar de un ID

        // If files is not null and is not empty
        if (file != null && !file.isEmpty()) {
            try {
                Files.createDirectories(Paths.get(uploadDirectory));//Gets the upload directory
                String newName = System.currentTimeMillis() + "_" + file.getOriginalFilename();//Writes a new name
                Path fileNameAndPath = Paths.get(uploadDirectory, newName);//Creates a path based on new Name and path
                Files.write(fileNameAndPath, file.getBytes());//Writes the file from the path and the bytes
                articleToInsert.setImage_url(fileNameAndPath.toString());//Set the image url to the article
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)//Throws and internal sever erro 500
                        .body("Error al subir la imagen: " + e.getMessage());
            }
        }

        // Saves the article
        articleRepository.save(articleToInsert);

        //Return created 201
        return new ResponseEntity<>(new ApiResponse("Articulo creado con éxito", articleToInsert), HttpStatus.CREATED);
    }



    @GetMapping("/image/{id}")//Retrieves the image based on the article ID
    public ResponseEntity<byte[]> getImageById(@PathVariable Long id) {
        Optional<Article> article = articleRepository.findById(id);//Finds the article by Id

        if (article.isEmpty() || article.get().getImage_url() == null) {//If not found
            return ResponseEntity.notFound().build();
        }

        try {
            Path imagePath = Paths.get(article.get().getImage_url());//Gets the image path

            if (!Files.exists(imagePath)) {//If file doesn't exist
                return ResponseEntity.notFound().build();
            }

            byte[] imageBytes = Files.readAllBytes(imagePath);//Get bytes
            return ResponseEntity.ok()//Set up the response entity with a content type and the imagebytes as response
                    .header("Content-Type", Files.probeContentType(imagePath))
                    .body(imageBytes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)//Throws an error
                    .body(null);
        }
    }

}
