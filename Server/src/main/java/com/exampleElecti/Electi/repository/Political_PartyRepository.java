package com.exampleElecti.Electi.repository;

import com.exampleElecti.Electi.model.Chatbot_Interaction;
import com.exampleElecti.Electi.model.Political_Party;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface Political_PartyRepository extends JpaRepository<Political_Party, String> {

    Optional<Political_Party> findById(String id);

}
