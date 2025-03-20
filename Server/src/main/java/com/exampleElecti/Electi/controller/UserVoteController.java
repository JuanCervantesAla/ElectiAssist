package com.exampleElecti.Electi.controller;

import com.exampleElecti.Electi.dto.VoteCountDTO;
import com.exampleElecti.Electi.service.UserVoteService;
import com.exampleElecti.Electi.tool.VoteRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/*
*
* To store the votes from the user
*
* */

@RestController
@RequestMapping("/api/vote")
public class UserVoteController {

    //User vote
    @Autowired
    private UserVoteService userVoteService;

    @PostMapping("/add")
    public ResponseEntity<String> castVote(@RequestBody VoteRequest voteRequest) {
        //Calls the method vote that adds a vote to the database if the vote doesnt exist(The user cant vote twice a position)
        boolean success = userVoteService.vote(voteRequest.getUserId(), voteRequest.getCandidateId(), voteRequest.getPosition());

        if (success) {//If success and failure send its respective statuses
            return ResponseEntity.ok("Voto registrado exitosamente.");
        } else {
            return ResponseEntity.badRequest().body("Error: Ya votaste en esta categoría o los datos son incorrectos.");
        }
    }

    //Get all votes
    @GetMapping("/count_votes")
    public ResponseEntity<List<VoteCountDTO>> getVotesByCandidateWithPosition() {
        List<VoteCountDTO> voteCounts = userVoteService.getVoteCountsWithPosition();
        return ResponseEntity.ok(voteCounts);
    }

    //Get all the votes filtered by position and state (Lemus, Jalisco, Major)
    @GetMapping("/count_votes/{position}/{state}")
    public List<VoteCountDTO> getVotesByPositionAndState(
            @PathVariable String position,
            @PathVariable String state) {
        return userVoteService.getVotesByPositionAndState(position, state);
    }
}
