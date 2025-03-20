package com.exampleElecti.Electi.controller;

import com.exampleElecti.Electi.model.Proposal;
import com.exampleElecti.Electi.repository.ProposalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

/*
* DEPRECATED AND UNUSED
* */

@RestController
@RequestMapping("/api/proposal")
public class ProposalController {

    private final ProposalRepository proposalRepository;

    @Autowired
    public ProposalController(ProposalRepository proposalRepository) {
        this.proposalRepository = proposalRepository;//Constructor for the repository
    }

    @GetMapping
    public List<Proposal> proposal(){//Returns all the users on the database
        return proposalRepository.findAll();
    }

    @GetMapping("/{id}")//Find the user by their Id
    public ResponseEntity<Proposal> getProposalId(@PathVariable String id){
        Optional<Proposal> proposal = proposalRepository.findById(id);
        return proposal.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

}
