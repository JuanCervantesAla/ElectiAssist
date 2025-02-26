package com.exampleElecti.Electi.component;

import com.exampleElecti.Electi.model.Candidate;
import com.exampleElecti.Electi.service.CandidateService;
import com.exampleElecti.Electi.service.PythonService;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.concurrent.CompletableFuture;

//@Component
//public class CandidateStartupRunner implements ApplicationRunner {
//
//    private final PythonService pythonService;
//    private final CandidateService candidateService;
//
//    public CandidateStartupRunner(PythonService pythonService, CandidateService candidateService) {
//        this.pythonService = pythonService;
//        this.candidateService = candidateService;
//    }
//
//    @Override
//    public void run(ApplicationArguments args) {
//        CompletableFuture.runAsync(() -> {
//            System.out.println("Ejecutando candidateScraping al inicio de la aplicación...");
//            List<Candidate> candidates = pythonService.executeCandidateScraping("src/main/resources/scripts/fromcsv.py").join();
//            candidateService.saveCandidates(candidates);
//            System.out.println("Candidatos guardados exitosamente.");
//        });
//    }
//}

