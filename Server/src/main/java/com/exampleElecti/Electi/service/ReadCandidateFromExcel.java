package com.exampleElecti.Electi.service;

import com.exampleElecti.Electi.model.Candidate;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class ReadCandidateFromExcel {

    /*Reading all the candidates from Excel file, xls file*/
    public List<Candidate> readCandidates (String filePath){

        List<Candidate> candidates = new ArrayList<>();//All the incoming candidates

        try(FileInputStream fileInput = new FileInputStream(new File(filePath));//Open the file
            Workbook workbook = new HSSFWorkbook(fileInput)) { //Workbook where all the content is stored
            Sheet sheet = workbook.getSheetAt(0);//Starting at workbook page1
            for (Row row : sheet) {//Iterate through all the Rows
                if (row.getRowNum() == 0) continue;//Skip row 0, titles and headers

                Candidate candidate = new Candidate();//Creates a new Object template
                candidate.setName(row.getCell(7).getStringCellValue());//Collects all the ifnromation from the columns
                candidate.setAge((int) row.getCell(10).getNumericCellValue());
                candidate.setLevel(row.getCell(17).getStringCellValue());
                candidate.setPosition(row.getCell(1).getStringCellValue());
                candidate.setParty(row.getCell(0).getStringCellValue());
                candidates.add(candidate);//Add the candidate to the list

            }

        } catch (Exception e){//
            e.printStackTrace();
            return null;
        }

        return candidates;

    }
}
