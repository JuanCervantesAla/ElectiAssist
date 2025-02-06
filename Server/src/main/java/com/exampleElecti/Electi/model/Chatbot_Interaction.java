package com.exampleElecti.Electi.model;

import jakarta.persistence.*;

import java.time.LocalDate;

/*
 * @Author: Cervantes Juan
 * @Date: 1/13/2025
 * */


@Entity
@Table(name = "CHATBOT_INTERACTION")
public class Chatbot_Interaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "question")
    private String question;

    @Column(name = "response")
    private String response;

    @Column(name = "date")
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "fk_user_id", nullable = false)
    private User user;

    public Chatbot_Interaction(){}

    public Chatbot_Interaction(Long id_, String question_, String response_, LocalDate date_){
        this.id = id_;
        this.question = question_;
        this.response = response_;
        this.date = date_;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }


}
