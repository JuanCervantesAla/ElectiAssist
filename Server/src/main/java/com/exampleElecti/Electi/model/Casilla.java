package com.exampleElecti.Electi.model;

import jakarta.persistence.*;

@Entity
@Table(name = "CASILLA")
public class Casilla {

    /********* ATTRIBUTES *********/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "state")
    private String state;

    @Column(name = "address", length= 600)
    private String address;

    @Column(name = "section")
    private String section;

    @Column(name = "type")
    private String type;

    /********* CONSTRUCTORS *********/
    public Casilla(){}

    public Casilla(Long id, String state, String address, String section, String type) {
        this.id = id;
        this.state = state;
        this.address = address;
        this.section = section;
        this.type = type;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
