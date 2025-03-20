package com.exampleElecti.Electi.repository;

import com.exampleElecti.Electi.model.Casilla;
import com.exampleElecti.Electi.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CasillaRepository extends JpaRepository<Casilla,Long> {
    //Search in the database by the attribute provided
    Optional<Casilla> findById(Long id);
    Optional<Casilla> findBySection(String section);
    Optional<Casilla> findByState(String state);

    Optional<Casilla> findBySectionAndState(String section, String state);

    Optional<Casilla> findBySectionAndStateAndType(String section, String state, String type);

}
