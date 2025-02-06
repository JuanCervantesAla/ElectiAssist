package com.exampleElecti.Electi.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

/*
 * @Author: Cervantes Juan
 * @Date: 1/10/2025
 * */

@Entity
@Table(name = "USER")
public class User {

    /********* ATTRIBUTES*********/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "password")
    private String password;

    @Column(name = "section")
    private String section;

    @Column(name = "polling_station")
    private String polling_station;

    @Column(name = "age")
    private Integer age;

    @Column(name = "curp")
    private String curp;

    /********* RELATIONS*********/
    @OneToMany(mappedBy = "user")
    private List<Chatbot_Interaction> chatbotInteractionList;

    @OneToMany(mappedBy = "user")
    private List<Article> articleList;

    @OneToMany(mappedBy = "user")
    private Set<User_Vote> userVotes;


    /********* CONSTRUCTOR*********/
    public User(){}
    public User(Long id_, String name_, String email_, String password_, String section_, String polling_station_, Integer age_, String curp_){
        this.id = id_;
        this.name = name_;
        this.email = email_;
        this.password = password_;
        this.section = section_;
        this.polling_station = polling_station_;
        this.curp = curp_;
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

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getPolling_station() {
        return polling_station;
    }

    public void setPolling_station(String polling_station) {
        this.polling_station = polling_station;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getCurp(){
        return curp;
    }

    public void setCurp(String curp_){
        this.curp = curp_;
    }

    public List<Chatbot_Interaction> getChatbotInteractionList() {
        return chatbotInteractionList;
    }

    public void setChatbotInteractionList(List<Chatbot_Interaction> chatbotInteractionList) {
        this.chatbotInteractionList = chatbotInteractionList;
    }

    public List<Article> getArticleList() {
        return articleList;
    }

    public void setArticleList(List<Article> articleList) {
        this.articleList = articleList;
    }

    public Set<User_Vote> getUserVotes() {
        return userVotes;
    }

    public void setUserVotes(Set<User_Vote> userVotes) {
        this.userVotes = userVotes;
    }
}
