package com.exampleElecti.Electi.service;

import com.exampleElecti.Electi.model.Candidate;
import com.exampleElecti.Electi.model.Political_Party;
import com.exampleElecti.Electi.repository.Political_PartyRepository;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReadCandidateFromExcel {

    //Gets the repository
    private final Political_PartyRepository politicalPartyRepository;

    @Autowired//Constructor
    public ReadCandidateFromExcel(Political_PartyRepository politicalPartyRepository) {
        this.politicalPartyRepository = politicalPartyRepository;
    }

    //Read candidates from xls
    public List<Candidate> readCandidates(String filePath) {
        List<Candidate> candidates = new ArrayList<>();//Makes a list for them

        try (FileInputStream fileInput = new FileInputStream(new File(filePath));
             Workbook workbook = new XSSFWorkbook(fileInput)) {//Using workbook to read from excel

            Sheet sheet = workbook.getSheetAt(0);//Starting from page 0

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue;//Skipping row 0

                String partyName = row.getCell(0).getStringCellValue();//Get the party name
                Optional<Political_Party> partyOptional = politicalPartyRepository.findByName(partyName);//Finds the party name

                if (partyOptional.isPresent()) {//If its present , it exists
                    Political_Party party = partyOptional.get();//Gets party

                    Candidate candidate = new Candidate();//Creates a new candidate
                    candidate.setName(row.getCell(7).getStringCellValue());//Read the row and convert to Numeric or String depends on the case
                    candidate.setAge((int) row.getCell(10).getNumericCellValue());
                    candidate.setLevel(row.getCell(17).getStringCellValue());
                    candidate.setPosition(row.getCell(1).getStringCellValue());
                    candidate.setPolitical_party(party);
                    candidate.setState(row.getCell(2).getStringCellValue());

                    candidates.add(candidate);//Add the candidate created
                } else {
                    System.out.println("No se encontró el partido: " + partyName);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();//Prints error in case of and return null
            return null;
        }

        return candidates;//Return the list of candidates
    }
}
