package com.exampleElecti.Electi.model;

/*
* @Author: Juan Cervantes
* @Date: 1/20/2025
* @Info: A class just to get and return the http response from the API
* */

public class ApiResponse {

    /********* ATTRIBUTES*********/
    private String message;
    private String token;
    private Object data;

    /********* Constructor*********/
    public ApiResponse(String message_, Object data_, String token_){
        this.message = message_;
        this.data = data_;
        this.token = token_;
    }

    public ApiResponse(String message_, Object data_){
        this.message = message_;
        this.data = data_;
    }

    public ApiResponse(String message_){
        this.message = message_;
    }

    /********* GETTERS&SETTERS*********/
    public String getMessage(){return message;}
    public Object getData(){return data;}
    public String getToken(){return token;}


}
