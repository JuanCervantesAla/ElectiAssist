package com.exampleElecti.Electi.controller;

import com.exampleElecti.Electi.service.ChatbotService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {

    private final ChatbotService chatbotService;

    @Autowired
    public ChatbotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping("/send")
    public ResponseEntity<Map<String, String>> sendMessage(@RequestBody Map<String, String> request) {
        //Take the message from the JSON
        String userMessage = request.get("message");

        //Gets the response from the chatbot
        String chatbotResponse = chatbotService.getChatbotResponse(userMessage);

        //Creates a JSON with the response
        Map<String, String> response = new HashMap<>();
        response.put("response", chatbotResponse);

        //Returns the response
        return ResponseEntity.ok(response);
    }
}