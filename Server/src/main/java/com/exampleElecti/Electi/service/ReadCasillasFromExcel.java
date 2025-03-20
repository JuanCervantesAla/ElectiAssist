package com.exampleElecti.Electi.service;

import com.exampleElecti.Electi.model.Casilla;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

public class ReadCasillasFromExcel {

    public List<Casilla> readCasillas(String filePath) {
        List<Casilla> casillas = new ArrayList<>();

        try (FileInputStream fileInput = new FileInputStream(new File(filePath));
             Workbook workbook = new XSSFWorkbook(fileInput)) { // Workbook to read

            Sheet sheet = workbook.getSheetAt(0); // Takes the first page

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue; // Skips the firs row

                Casilla casilla = new Casilla();

                casilla.setState(getCellValueAsString(row.getCell(0)));//Gets the data and converts depending on the value
                casilla.setSection(getCellValueAsString(row.getCell(2)));
                casilla.setAddress(getCellValueAsString(row.getCell(4)));
                casilla.setType(getCellValueAsString(row.getCell(3)));

                casillas.add(casilla);//Adds a polling station
            }

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return casillas;
    }

    //Method to evaluate different kinds of cell
    private String getCellValueAsString(Cell cell) {
        if (cell == null) {
            return ""; // If null pointer returns nothings
        }
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();//Return if string
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString(); // If date cast to string
                } else {
                    return String.valueOf((long) cell.getNumericCellValue()); // If int cast to string
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());//Return boolean
            case FORMULA:
                return cell.getCellFormula(); //And cell formula
            default:
                return "";//Not found return nothing
        }
    }
}
