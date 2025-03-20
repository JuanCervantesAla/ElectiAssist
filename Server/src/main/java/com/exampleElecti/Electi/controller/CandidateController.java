package com.exampleElecti.Electi.controller;

import com.exampleElecti.Electi.model.Candidate;
import com.exampleElecti.Electi.repository.CandidateRepository;
import com.exampleElecti.Electi.repository.Political_PartyRepository;
import com.exampleElecti.Electi.service.CandidateService;
import com.exampleElecti.Electi.service.ReadCandidateFromExcel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/candidate")
public class CandidateController {

    private final CandidateRepository candidateRepository;
    private final Political_PartyRepository politicalPartyRepository;

    @Autowired
    private final CandidateService candidateService;

    @Autowired
    public CandidateController(CandidateRepository candidateRepository, Political_PartyRepository politicalPartyRepository, CandidateService candidateService) {
        this.candidateRepository = candidateRepository;
        this.politicalPartyRepository = politicalPartyRepository;
        this.candidateService = candidateService;
    }

    @GetMapping
    public List<Candidate> candidates(){//Returns all the candidates on the database
        return candidateRepository.findAll();
    }

    @GetMapping("/{id}")//Find the user by their Id
    public ResponseEntity<Candidate> getCandidateId(@PathVariable Long id){
        Optional<Candidate> candidate = candidateRepository.findById(id);
        return candidate.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/updateAll")//Using service Read from excel updates all the candidates
    public ResponseEntity<String> updateAll(){
        ReadCandidateFromExcel readCandidateFromExcel = new ReadCandidateFromExcel(politicalPartyRepository);

        //Get the candidates
        String filepath = "src/main/resources/candidates.xlsx";//Gets the path
        List<Candidate> candidates = readCandidateFromExcel.readCandidates(filepath);//Return all the candidates
        candidateService.saveCandidates(candidates);//Save all the candidates

        return new ResponseEntity<String>("Updated candidates", HttpStatus.OK);//Status 200 ok
    }

}
