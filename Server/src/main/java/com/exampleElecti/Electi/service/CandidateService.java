package com.exampleElecti.Electi.service;

import com.exampleElecti.Electi.model.Candidate;
import com.exampleElecti.Electi.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidateService {

    @Autowired
    private CandidateRepository candidateRepository;

    //Saves candidates
    public void saveCandidates(List<Candidate> candidates) {
        candidateRepository.saveAll(candidates);
    }
}