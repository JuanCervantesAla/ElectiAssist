package com.exampleElecti.Electi.service;

import com.exampleElecti.Electi.model.Candidate;
import com.exampleElecti.Electi.model.Casilla;
import com.exampleElecti.Electi.repository.CandidateRepository;
import com.exampleElecti.Electi.repository.CasillaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CasillaService {

    @Autowired
    private CasillaRepository casillaRepository;
    //Saves casillas
    public void saveCasilla(List<Casilla> casillas) {
        casillaRepository.saveAll(casillas);
    }
}