package com.exampleElecti.Electi.repository;

import com.exampleElecti.Electi.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article,Long> {

    Optional<Article> findById(Long id);
    Optional<Article> findByTitle(String name);

}
