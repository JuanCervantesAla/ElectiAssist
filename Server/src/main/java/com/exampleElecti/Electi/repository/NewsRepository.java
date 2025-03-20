package com.exampleElecti.Electi.repository;

import com.exampleElecti.Electi.model.Article;
import com.exampleElecti.Electi.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NewsRepository extends JpaRepository<News,Long> {

    //Search in the database by the attribute provided
    Optional<News> findById(Long id);
    Optional<News> findByTitle(String name);

}
