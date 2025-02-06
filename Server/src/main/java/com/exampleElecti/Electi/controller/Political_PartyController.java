package com.exampleElecti.Electi.controller;

import com.exampleElecti.Electi.model.Political_Party;
import com.exampleElecti.Electi.repository.Political_PartyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/political_party")
public class Political_PartyController {

    private final Political_PartyRepository political_party_repository;

    @Autowired
    public Political_PartyController(Political_PartyRepository politicalPartyRepository) {
        political_party_repository = politicalPartyRepository;
    }

    @GetMapping
    public List<Political_Party> political_parties(){
        return political_party_repository.findAll();
    }

    @GetMapping("/{id}")//Find the political_party by their Id
    public ResponseEntity<Political_Party> getPolitical_PartyId(@PathVariable String id){
        Optional<Political_Party> political_party = political_party_repository.findById(id);
        return political_party.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

}