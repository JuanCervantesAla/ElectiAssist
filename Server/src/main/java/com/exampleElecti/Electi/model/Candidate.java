package com.exampleElecti.Electi.model;


import jakarta.persistence.*;

import java.util.List;

/*
 * @Author: Cervantes Juan
 * @Date: 1/10/2025
 * */


@Entity
@Table(name = "CANDIDATE")
public class Candidate {

    /********* ATTRIBUTES*********/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "age")
    private Integer age;

    @Column(name = "level")
    private String level;

    @Column(name = "position")
    private String position;

    /********* RELATIONS*********/
    @OneToMany(mappedBy = "candidate")
    public List<Proposal> proposalList;

    @ManyToOne
    @JoinColumn(name = "fk_political_party_id", nullable = false)
    private Political_Party political_party;


    /********* CONSTRUCTOR*********/
    public Candidate(){}
    public Candidate(Long id_, String name_, Integer age_, String level_, String position_){
        this.id  = id_;
        this.name = name_;
        this.age = age_;
        this.level = level_;
        this.position = position_;
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

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

}
