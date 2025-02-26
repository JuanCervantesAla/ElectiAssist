package com.exampleElecti.Electi.model;


import jakarta.persistence.*;

import java.util.List;

/*
 * @Author: Cervantes Juan
 * @Date: 1/13/2025
 * */

@Entity
@Table(name = "POLITICAL_PARTY")
public class Political_Party {

    /********* ATTRIBUTES*********/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name ="name")
    private String name;

    @Column(name ="image_url")
    private String image_url;

//    /********* RELATIONS*********/
//    @OneToMany(mappedBy = "political_party")
//    public List<Candidate> candidateList;

    /********* CONSTRUCTOR*********/
    public Political_Party(){}
    public Political_Party(Long id_, String name_, String image_url_){
        this.id = id_;
        this.name = name_;
        this.image_url = image_url_;
    }

    /********* GETTERS&SETTERS*********/
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }
}
