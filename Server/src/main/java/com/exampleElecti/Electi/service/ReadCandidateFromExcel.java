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

    private final Political_PartyRepository politicalPartyRepository;

    @Autowired
    public ReadCandidateFromExcel(Political_PartyRepository politicalPartyRepository) {
        this.politicalPartyRepository = politicalPartyRepository;
    }

    public List<Candidate> readCandidates(String filePath) {
        List<Candidate> candidates = new ArrayList<>();

        try (FileInputStream fileInput = new FileInputStream(new File(filePath));
             Workbook workbook = new XSSFWorkbook(fileInput)) {

            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue;

                String partyName = row.getCell(0).getStringCellValue();
                Optional<Political_Party> partyOptional = politicalPartyRepository.findByName(partyName);

                if (partyOptional.isPresent()) {
                    Political_Party party = partyOptional.get();

                    Candidate candidate = new Candidate();
                    candidate.setName(row.getCell(7).getStringCellValue());
                    candidate.setAge((int) row.getCell(10).getNumericCellValue());
                    candidate.setLevel(row.getCell(17).getStringCellValue());
                    candidate.setPosition(row.getCell(1).getStringCellValue());
                    candidate.setPolitical_party(party);
                    candidate.setState(row.getCell(2).getStringCellValue());

                    candidates.add(candidate);
                } else {
                    System.out.println("No se encontró el partido: " + partyName);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return candidates;
    }
}
