package com.exampleElecti.Electi.config;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ChatbotConfig {
    private final Dotenv dotenv;

    public ChatbotConfig(Dotenv dotenv) {
        this.dotenv = dotenv;
    }//Constructor

    @Bean
    public String getApiKey() {
        return dotenv.get("MY_API_KEY");
    }//Get the api key from dotenv
}