package com.exampleElecti.Electi.tool;

public class VoteRequest {
    private Long userId;
    private Long candidateId;
    private String position;
    private Long politicalPartyId; // Nuevo campo

    // Getters y Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getCandidateId() { return candidateId; }
    public void setCandidateId(Long candidateId) { this.candidateId = candidateId; }

    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }

    public Long getPoliticalPartyId() { return politicalPartyId; }
    public void setPoliticalPartyId(Long politicalPartyId) { this.politicalPartyId = politicalPartyId; }
}
