package com.exampleElecti.Electi.repository;

import com.exampleElecti.Electi.model.Chatbot_Interaction;
import com.exampleElecti.Electi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface Chatbot_InteractionRepository extends JpaRepository<Chatbot_Interaction,String> {

    Optional<Chatbot_Interaction> findById(String id);

}
