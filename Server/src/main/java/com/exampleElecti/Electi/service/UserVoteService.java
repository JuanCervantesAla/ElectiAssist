package com.exampleElecti.Electi.service;

import com.exampleElecti.Electi.dto.VoteCountDTO;
import com.exampleElecti.Electi.model.User;
import com.exampleElecti.Electi.model.Candidate;
import com.exampleElecti.Electi.model.UserVote;
import com.exampleElecti.Electi.repository.UserVoteRepository;
import com.exampleElecti.Electi.repository.UserRepository;
import com.exampleElecti.Electi.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserVoteService {

    @Autowired
    private UserVoteRepository userVoteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    public boolean vote(Long userId, Long candidateId, String position) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Candidate> candidate = candidateRepository.findById(candidateId);

        if (user.isPresent() && candidate.isPresent()) {
            // Verificar si el usuario ya votó para esa posición
            if (userVoteRepository.existsByUserIdAndPosition(userId, position)) {
                return false; // Ya votó en esta categoría
            }

            UserVote userVote = new UserVote(user.get(), candidate.get(), position);
            userVoteRepository.save(userVote);
            return true;
        }
        return false; // Usuario o candidato no existen
    }

    public UserVoteService(UserVoteRepository userVoteRepository) {
        this.userVoteRepository = userVoteRepository;
    }

    public Map<Long, Long> getVoteCounts() {
        List<UserVote> votes = userVoteRepository.findAll();

        // Contar los votos por candidato
        return votes.stream()
                .collect(Collectors.groupingBy(vote -> vote.getCandidate().getId(), Collectors.counting()));
    }

    public List<VoteCountDTO> getVoteCountsWithPosition() {
        List<VoteCountDTO> voteCounts = userVoteRepository.countVotesByCandidate();

        return voteCounts.stream().map(vote -> {
            Candidate candidate = candidateRepository.findById(vote.getCandidateId()).orElse(null);
            String candidateName = (candidate != null) ? candidate.getName() : "Desconocido";
            Integer age = (candidate != null) ? candidate.getAge() : null;
            String level = (candidate != null) ? candidate.getLevel() : "No especificado";
            String state = (candidate != null) ? candidate.getState() : "No especificado";
            String party = (candidate != null && candidate.getPolitical_party() != null) ? candidate.getPolitical_party().getName() : "Independiente";

            return new VoteCountDTO(vote.getCandidateId(), candidateName, age, level, vote.getPosition(), state, party, vote.getVoteCount());
        }).collect(Collectors.toList());
    }

    public List<VoteCountDTO> getVotesByPositionAndState(String position, String state) {
        return userVoteRepository.findVotesByPositionAndState(position, state);
    }
}
