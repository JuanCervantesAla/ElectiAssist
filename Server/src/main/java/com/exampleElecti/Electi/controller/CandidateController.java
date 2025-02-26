package com.exampleElecti.Electi.controller;

import com.exampleElecti.Electi.model.Candidate;
import com.exampleElecti.Electi.repository.CandidateRepository;
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

    @Autowired
    private final CandidateService candidateService;

    @Autowired
    public CandidateController(CandidateRepository candidateRepository, CandidateService candidateService) {
        this.candidateRepository = candidateRepository;
        this.candidateService = candidateService;
    }

    @GetMapping
    public List<Candidate> candidates(){//Returns all the candidates on the database
        return candidateRepository.findAll();
    }

    @GetMapping("/{id}")//Find the user by their Id
    public ResponseEntity<Candidate> getCandidateId(@PathVariable String id){
        Optional<Candidate> candidate = candidateRepository.findById(id);
        return candidate.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/updateAll")
    public ResponseEntity<String> updateAll(){
        ReadCandidateFromExcel readCandidateFromExcel = new ReadCandidateFromExcel();

        String filepath = "src/main/resources/candidates.xls";//Gets the path
        List<Candidate> candidates = readCandidateFromExcel.readCandidates(filepath);//Return all the candidates
        candidateService.saveCandidates(candidates);

        return new ResponseEntity<String>("Updated candidates", HttpStatus.OK);
    }

}
