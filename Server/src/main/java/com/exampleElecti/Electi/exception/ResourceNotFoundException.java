package com.exampleElecti.Electi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/*
* @Author: Juan Cervantes
* @Date: 1/20/2025
* */

@ResponseStatus(HttpStatus.NOT_FOUND)//Status http 404 NOT FOUND in case its not found
public class ResourceNotFoundException extends RuntimeException{


    public ResourceNotFoundException(String message){
        super(message);//Calls the constructor from Runtime and creates a new instance with the message
    }

    public ResourceNotFoundException(String message, Throwable cause){
        super(message,cause);//Calls the constructor from Runtime and creates a new instance with the message
    }

}
