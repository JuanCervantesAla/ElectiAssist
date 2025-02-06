package com.exampleElecti.Electi.service;

import com.exampleElecti.Electi.security.ChatbotConfig;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ChatbotService {

    private static final String STACK_AI_API_URL = "https://api.stack-ai.com/inference/v0/run/ba63d0ae-3518-4bd8-95f2-84c91e152fe6/67993bcf755257a92fa7f273";
    private static String API_KEY = "";

    ChatbotService(ChatbotConfig chatbotConfig){
        API_KEY = chatbotConfig.getApiKey();
    }

    public String getChatbotResponse(String userMessage) {
        RestTemplate restTemplate = new RestTemplate();
        System.out.println(userMessage);
        //Set Headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + API_KEY);

        //Creates the body
        String requestBody = "{\"in-0\": \"" + userMessage + "\"}";
        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        //Send and receive
        ResponseEntity<String> response = restTemplate.exchange(
                STACK_AI_API_URL,
                HttpMethod.POST,
                request,
                String.class
        );

        return response.getBody();
    }
}