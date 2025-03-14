package com.exampleElecti.Electi.controller;

import com.exampleElecti.Electi.dto.VoteCountDTO;
import com.exampleElecti.Electi.service.UserVoteService;
import com.exampleElecti.Electi.tool.VoteRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/vote")
public class UserVoteController {

    @Autowired
    private UserVoteService userVoteService;

    @PostMapping("/add")
    public ResponseEntity<String> castVote(@RequestBody VoteRequest voteRequest) {
        boolean success = userVoteService.vote(voteRequest.getUserId(), voteRequest.getCandidateId(), voteRequest.getPosition());

        if (success) {
            return ResponseEntity.ok("Voto registrado exitosamente.");
        } else {
            return ResponseEntity.badRequest().body("Error: Ya votaste en esta categoría o los datos son incorrectos.");
        }
    }

    @GetMapping("/count_votes")
    public ResponseEntity<List<VoteCountDTO>> getVotesByCandidateWithPosition() {
        List<VoteCountDTO> voteCounts = userVoteService.getVoteCountsWithPosition();
        return ResponseEntity.ok(voteCounts);
    }
}
