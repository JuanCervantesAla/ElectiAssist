package com.exampleElecti.Electi.controller;

import com.exampleElecti.Electi.model.Candidate;
import com.exampleElecti.Electi.service.CandidateService;
import com.exampleElecti.Electi.service.PythonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/python")
public class PythonController {

    private PythonService pythonService;

    @Autowired
    private CandidateService candidateService;

    @Autowired
    public PythonController(PythonService pythonService_){
        this.pythonService = pythonService_;
    }

    @PostMapping("/phe")
    public CompletableFuture<String> processPhe(@RequestBody Map<String, List<Integer>> request){
        List<Integer> data = request.get("data");
        System.out.println(data);
        return pythonService.executePythonAsync(data, "src/main/resources/scripts/script.py");
    }

    @GetMapping("/candidates")
    public CompletableFuture<String> processCandidates() {
        return CompletableFuture.supplyAsync(() -> {
            List<Candidate> candidates = pythonService.executeCandidateScraping("src/main/resources/scripts/fromcsv.py").join();
            candidateService.saveCandidates(candidates);
            return "Candidatos guardados exitosamente.";
        });
    }

}
