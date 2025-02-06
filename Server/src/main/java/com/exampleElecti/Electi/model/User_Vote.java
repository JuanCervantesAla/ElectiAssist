package com.exampleElecti.Electi.model;


import jakarta.persistence.*;

/*
 * @Author: Cervantes Juan
 * @Date: 1/13/2025
 * */

@Entity
@Table(name = "USER_VOTE")
public class User_Vote {

    /********* ATTRIBUTES*********/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id" , referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "presidency_id")
    private Candidate presidency;

    @ManyToOne
    @JoinColumn(name = "deputy_id")
    private Candidate deputy;

    @ManyToOne
    @JoinColumn(name = "mayor_id")
    private Candidate mayor;

    @ManyToOne
    @JoinColumn(name = "governor_id")
    private Candidate governor;

    @ManyToOne
    @JoinColumn(name = "senator_id")
    private Candidate senator;


    /********* CONSTRUCTOR*********/
    public User_Vote(){}

    public User_Vote(User user_, Candidate presidency_, Candidate deputy_, Candidate mayor_, Candidate governor_, Candidate senator_){
        this.presidency = presidency_;
        this.deputy = deputy_;
        this.mayor = mayor_;
        this.governor = governor_;
        this.senator = senator_;
    }

    /********* GETTERS&SETTERS*********/
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Candidate getPresidency() {
        return presidency;
    }

    public void setPresidency(Candidate presidency) {
        this.presidency = presidency;
    }

    public Candidate getDeputy() {
        return deputy;
    }

    public void setDeputy(Candidate deputy) {
        this.deputy = deputy;
    }

    public Candidate getMayor() {
        return mayor;
    }

    public void setMayor(Candidate mayor) {
        this.mayor = mayor;
    }

    public Candidate getGovernor() {
        return governor;
    }

    public void setGovernor(Candidate governor) {
        this.governor = governor;
    }

    public Candidate getSenator() {
        return senator;
    }

    public void setSenator(Candidate senator) {
        this.senator = senator;
    }
}
