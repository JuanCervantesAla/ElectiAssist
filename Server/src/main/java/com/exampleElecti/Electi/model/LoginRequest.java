package com.exampleElecti.Electi.model;


/*
* @Author: Juan Cervantes
* @Date: 1/20/25
* @Info: Just a handler for the login information
* */
public class LoginRequest {

    private String email;
    private String password;

    public LoginRequest(String email_, String password_){
        this.email = email_;
        this.password = password_;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
