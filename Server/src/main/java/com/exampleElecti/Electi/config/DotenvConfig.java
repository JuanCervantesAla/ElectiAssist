package com.exampleElecti.Electi.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


/*
*
* @Author: Juan Cervantes
* @Date: 2/4/2025
* @About: Configuration file for env file
*
* */
@Configuration
public class DotenvConfig {

    @Bean
    public Dotenv dotenv(){
        //Create the instance of dotenv
        Dotenv dotenv = Dotenv.load();

        dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

        return dotenv;
    }

}
