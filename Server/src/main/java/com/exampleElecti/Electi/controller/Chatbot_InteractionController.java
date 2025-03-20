package com.exampleElecti.Electi.controller;

import com.exampleElecti.Electi.model.Chatbot_Interaction;
import com.exampleElecti.Electi.model.User;
import com.exampleElecti.Electi.repository.Chatbot_InteractionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
/*
* Not used in final product
* */


@RestController
@RequestMapping("/api/chatbot_interaction")
public class Chatbot_InteractionController {

    private final Chatbot_InteractionRepository chatbotInteractionRepository;

    @Autowired
    public Chatbot_InteractionController(Chatbot_InteractionRepository chatbotInteractionRepository) {
        this.chatbotInteractionRepository = chatbotInteractionRepository;
    }

    @GetMapping
    public List<Chatbot_Interaction> chatbot_interactions(){//Returns all the interactions on the database
        return chatbotInteractionRepository.findAll();
    }

    @GetMapping("/{id}")//Find the user by their Id
    public ResponseEntity<Chatbot_Interaction> getChatbot_InteractionsId(@PathVariable String id){
        Optional<Chatbot_Interaction> chatbotInteraction = chatbotInteractionRepository.findById(id);
        return chatbotInteraction.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

}
