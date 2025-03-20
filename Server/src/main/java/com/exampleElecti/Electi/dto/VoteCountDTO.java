package com.exampleElecti.Electi.dto;

/*
*
* Class used to save the votes same as userVote
*
* */

public class VoteCountDTO {
    //Attributes
    private Long candidateId;
    private String candidateName;
    private Integer age;
    private String level;
    private String position;
    private String state;
    private String party;
    private Long voteCount;

    //Constructor
    public VoteCountDTO(Long candidateId, String candidateName, Integer age, String level, String position, String state, String party, Long voteCount) {
        this.candidateId = candidateId;
        this.candidateName = candidateName;
        this.age = age;
        this.level = level;
        this.position = position;
        this.state = state;
        this.party = party;
        this.voteCount = voteCount;
    }

    //Getter and setters
    public Long getCandidateId() {
        return candidateId;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public Integer getAge() {
        return age;
    }

    public String getLevel() {
        return level;
    }

    public String getPosition() {
        return position;
    }

    public String getState() {
        return state;
    }

    public String getParty() {
        return party;
    }

    public Long getVoteCount() {
        return voteCount;
    }
}
