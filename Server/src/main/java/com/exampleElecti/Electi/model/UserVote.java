package com.exampleElecti.Electi.model;

import jakarta.persistence.*;

/*
 * @Author: Cervantes Juan
 * @Date: 1/13/2025
 * */

@Entity
@Table(name = "USER_VOTE")
public class UserVote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "candidate_id", referencedColumnName = "id", nullable = false)
    private Candidate candidate;

    @Column(name = "position", nullable = false)
    private String position; // Ejemplo: "PRESIDENCIA", "DIPUTADO", "SENADOR"

    public UserVote() {}

    public UserVote(User user, Candidate candidate, String position) {
        this.user = user;
        this.candidate = candidate;
        this.position = position;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Candidate getCandidate() {
        return candidate;
    }

    public String getPosition() {
        return position;
    }
}
