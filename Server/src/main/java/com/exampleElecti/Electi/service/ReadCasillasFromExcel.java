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
             Workbook workbook = new XSSFWorkbook(fileInput)) { // Usa XSSFWorkbook para .xlsx

            Sheet sheet = workbook.getSheetAt(0); // Tomar la primera hoja del libro de Excel

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue; // Omitir la primera fila (encabezados)

                Casilla casilla = new Casilla();

                casilla.setState(getCellValueAsString(row.getCell(0))); // Estado
                casilla.setSection(getCellValueAsString(row.getCell(2))); // Sección
                casilla.setAddress(getCellValueAsString(row.getCell(4))); // Dirección
                casilla.setType(getCellValueAsString(row.getCell(3)));

                casillas.add(casilla);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return casillas;
    }

    // Método para manejar distintos tipos de celdas
    private String getCellValueAsString(Cell cell) {
        if (cell == null) {
            return ""; // Evita NullPointerException
        }
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString(); // Si es una fecha, la convierte a String
                } else {
                    return String.valueOf((long) cell.getNumericCellValue()); // Convierte a entero si es numérico
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula(); // Retorna la fórmula en texto
            default:
                return "";
        }
    }
}
