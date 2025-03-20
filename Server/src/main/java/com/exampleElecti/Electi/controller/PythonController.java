package com.exampleElecti.Electi.controller;

import com.exampleElecti.Electi.model.Candidate;
import com.exampleElecti.Electi.service.CandidateService;
import com.exampleElecti.Electi.service.PythonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

/*
*
* Runs python code by proccess builder
*
* */

@RestController
@RequestMapping("/api/python")
public class PythonController {

    //Service
    private PythonService pythonService;

    @Autowired
    private CandidateService candidateService;

    @Autowired//Controller
    public PythonController(PythonService pythonService_){
        this.pythonService = pythonService_;
    }

    //Calling the python execution
    /*
    *
    * Vote encryption system, the votes must be sent as an array in order to python to encrypt them
    *
    * */
    @PostMapping("/phe")
    public CompletableFuture<String> processPhe(@RequestBody Map<String, List<Integer>> request){
        List<Integer> data = request.get("data");//Getting the list
        System.out.println(data);
        return pythonService.executePythonAsync(data, "src/main/resources/scripts/script.py");//Executes python
    }

    //Saves candidates
    @GetMapping("/candidates")
    public CompletableFuture<String> processCandidates() {
        return CompletableFuture.supplyAsync(() -> {
            List<Candidate> candidates = pythonService.executeCandidateScraping("src/main/resources/scripts/fromcsv.py").join();
            candidateService.saveCandidates(candidates);
            return "Candidatos guardados exitosamente.";
        });
    }

}
