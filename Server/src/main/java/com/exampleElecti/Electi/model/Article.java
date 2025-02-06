package com.exampleElecti.Electi.model;


import jakarta.persistence.*;

/*
 * @Author: Cervantes Juan
 * @Date: 1/13/2025
 * */

@Entity
@Table(name = "ARTICLE")
public class Article {

    /********* ATTRIBUTES*********/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "user_id")
    private String user_id;

    /********* RELATIONS*********/
    @ManyToOne
    @JoinColumn(name = "fk_user_id", nullable = false)
    private User user;


    /********* CONSTRUCTOR*********/
    public Article(){}

    public Article(Long id_, String title_, String user_id_){
        this.id = id_;
        this.title = title_;
        this.user_id = user_id_;
    }

    /********* GETTERS&SETTERS*********/
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }
}
