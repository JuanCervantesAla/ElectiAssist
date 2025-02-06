package com.exampleElecti.Electi.controller;

import com.exampleElecti.Electi.model.User;
import com.exampleElecti.Electi.model.User_Vote;
import com.exampleElecti.Electi.repository.User_VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user_vote")
public class User_VoteController {

    private final User_VoteRepository userVoteRepository;

    @Autowired
    public User_VoteController(User_VoteRepository userVoteRepository) {
        this.userVoteRepository = userVoteRepository;
    }

    @GetMapping
    public List<User_Vote> user_vote(){//Returns all the votes of all the users on the database
        return userVoteRepository.findAll();
    }

    @GetMapping("/{id}")//Find the user by their Id
    public ResponseEntity<User_Vote> getUser_VoteId(@PathVariable String id){
        Optional<User_Vote> user_vote = userVoteRepository.findById(id);
        return user_vote.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

}
