package com.exampleElecti.Electi.repository;


import com.exampleElecti.Electi.model.Proposal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProposalRepository extends JpaRepository<Proposal, String> {

    //Search in the database by the attribute provided
    Optional<Proposal> findById(String id);

}
