package com.exampleElecti.Electi.repository;

import com.exampleElecti.Electi.model.Article;
import com.exampleElecti.Electi.model.User_Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface User_VoteRepository extends JpaRepository<User_Vote, String> {

    Optional<User_Vote> findById(String id);

}
