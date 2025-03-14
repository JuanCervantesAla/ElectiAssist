package com.exampleElecti.Electi.repository;

import com.exampleElecti.Electi.dto.VoteCountDTO;
import com.exampleElecti.Electi.model.UserVote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserVoteRepository extends JpaRepository<UserVote, Long> {

    boolean existsByUserIdAndPosition(Long userId, String position);

    List<UserVote> findByCandidateId(Long candidateId);

    @Query("SELECT new com.exampleElecti.Electi.dto.VoteCountDTO(" +
            "c.id, c.name, c.age, c.level, c.position, c.state, p.name, COUNT(uv.id)) " +
            "FROM UserVote uv " +
            "JOIN uv.candidate c " +
            "JOIN c.political_party p " +
            "GROUP BY c.id, c.name, c.age, c.level, c.position, c.state, p.name")
    List<VoteCountDTO> countVotesByCandidate();

    @Query("SELECT new com.exampleElecti.Electi.dto.VoteCountDTO(c.id, c.name, c.age, c.level, c.position, c.state, p.name, COUNT(uv.id)) " +
            "FROM UserVote uv " +
            "JOIN uv.candidate c " +
            "JOIN c.political_party p " +
            "WHERE c.position = :position AND c.state = :state " +
            "GROUP BY c.id, c.name, c.age, c.level, c.position, c.state, p.name")
    List<VoteCountDTO> findVotesByPositionAndState(String position, String state);

}
