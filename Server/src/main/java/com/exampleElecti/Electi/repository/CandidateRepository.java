package com.exampleElecti.Electi.repository;

import com.exampleElecti.Electi.model.Candidate;
import com.exampleElecti.Electi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CandidateRepository extends JpaRepository<Candidate, String> {

    Optional<Candidate> findById(String id);

}
