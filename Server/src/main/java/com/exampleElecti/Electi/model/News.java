package com.exampleElecti.Electi.model;

import jakarta.persistence.*;

@Entity
@Table(name = "NEWS")
public class News {

    /********* ATTRIBUTES *********/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description", length = 600)
    private String description;

    @Column(name = "image_url")
    private String image_url;

    /********* RELATIONS *********/
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // Se mantiene la clave foránea
    private User user;

    /********* CONSTRUCTORS *********/
    public News() {}

    public News(Long id, String title, User user, String description, String image_url) {
        this.id = id;
        this.title = title;
        this.user = user;
        this.description = description;
        this.image_url = image_url;
    }

    /********* GETTERS & SETTERS *********/
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
