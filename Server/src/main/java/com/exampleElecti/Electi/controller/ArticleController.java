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

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    public static final String uploadDirectory = System.getProperty("user.dir") + "/uploads";

    @Autowired
    public ArticleController(ArticleRepository articleRepository, UserRepository userRepository) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Article> articles(){//Returns all the users on the database
        return articleRepository.findAll();
    }

    @GetMapping("/{id}")//Find the user by their Id
    public ResponseEntity<Article> getArticleId(@PathVariable Long id){
        Optional<Article> article = articleRepository.findById(id);
        return article.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("user_id") Long user_id,
            @RequestParam(value = "image", required = false) MultipartFile file) {

        // Verifica si el artículo ya existe
        if (articleRepository.findByTitle(title).isPresent()) {
            return new ResponseEntity<>(new ApiResponse("Ya se encuentra ese articulo!"), HttpStatus.CONFLICT);
        }

        // Busca el usuario en la base de datos
        User user = userRepository.findById(user_id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Crea un nuevo artículo
        Article articleToInsert = new Article();
        articleToInsert.setTitle(title);
        articleToInsert.setDescription(description);
        articleToInsert.setUser(user); // Asigna el usuario en lugar de un ID

        // Manejo de imagen
        if (file != null && !file.isEmpty()) {
            try {
                Files.createDirectories(Paths.get(uploadDirectory));
                String newName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                Path fileNameAndPath = Paths.get(uploadDirectory, newName);
                Files.write(fileNameAndPath, file.getBytes());
                articleToInsert.setImage_url(fileNameAndPath.toString());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error al subir la imagen: " + e.getMessage());
            }
        }

        // Guarda el artículo
        articleRepository.save(articleToInsert);

        return new ResponseEntity<>(new ApiResponse("Articulo creado con éxito", articleToInsert), HttpStatus.CREATED);
    }



    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getImageById(@PathVariable Long id) {
        Optional<Article> article = articleRepository.findById(id);

        if (article.isEmpty() || article.get().getImage_url() == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            Path imagePath = Paths.get(article.get().getImage_url());

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
