package com.exampleElecti.Electi.model;

import jakarta.persistence.*;

/*
 * @Author: Cervantes Juan
 * @Date: 1/10/2025
 * */

@Entity
@Table(name = "PROPOSAL")
public class Proposal {

    /********* ATTRIBUTES*********/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "proposal")
    private String proposal;

    @Column(name = "candidate_id")
    private String candidate_id;

    /********* RELATIONS*********/
    @ManyToOne
    @JoinColumn(name = "fk_candidate_id", nullable = false)
    private Candidate candidate;

    /********* CONSTRUCTOR*********/
    public Proposal(){}
    public Proposal(Long id_, String proposal_ , String candidate_id_){
        this.id = id_;
        this.proposal = proposal_;
        this.candidate_id = candidate_id_;
    }

    /********* GETTERS&SETTERS*********/
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCandidate_id() {
        return candidate_id;
    }

    public void setCandidate_id(String candidate_id) {
        this.candidate_id = candidate_id;
    }

    public String getProposal() {
        return proposal;
    }

    public void setProposal(String proposal) {
        this.proposal = proposal;
    }
}
