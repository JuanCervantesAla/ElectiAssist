package com.exampleElecti.Electi.service;

import com.exampleElecti.Electi.model.Candidate;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.lang.reflect.Type;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

/*
*
* @Author: Juan Cervantes
* @Date: 1/27/2025
* @About: Executes the python script stored in the server.
*
* */

@EnableAsync
@Service
public class PythonService {

    @Async // Using asynchronous tasks
    public CompletableFuture<List<Candidate>> executeCandidateScraping(String path) {
        return CompletableFuture.supplyAsync(() -> candidateScraping(path));
    }

    public List<Candidate> candidateScraping(String path) {
        try {
            ProcessBuilder processBuilder = new ProcessBuilder("python", path);
            processBuilder.redirectErrorStream(false); // No mezclar stdout y stderr

            // Iniciar proceso
            Process process = processBuilder.start();

            // Capturar stderr por separado (logs del script)
//            try (BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()))) {
//                String errorOutput = errorReader.lines().collect(Collectors.joining("\n"));
//                if (!errorOutput.isEmpty()) {
//                    System.err.println("Error en Python stderr:\n" + errorOutput);
//                }
//            }

            // Capturar solo stdout (el JSON limpio)
            String output;
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                output = reader.lines().collect(Collectors.joining("\n"));
            }

            // Esperar a que termine el proceso
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new RuntimeException("Python script finalizó con código " + exitCode);
            }

            // Verificar si la salida JSON es válida
            if (output.trim().isEmpty() || !output.trim().startsWith("[")) {
                throw new RuntimeException("Salida del script no es JSON válido: " + output);
            }

            // Mapear la salida JSON a lista de objetos Candidate
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            objectMapper.configure(JsonParser.Feature.ALLOW_NON_NUMERIC_NUMBERS, true); // Permitir NaN
            return objectMapper.readValue(output, new TypeReference<List<Candidate>>() {});




        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList(); // Retornar lista vacía en caso de error
        }
    }

    @Async//Using asyncronous tasks
    public CompletableFuture<String> executePythonAsync(List<Integer> data, String path){//Enables the future component
        return CompletableFuture.supplyAsync(() -> phePython(data, path));//Does not return when executed
    }

    public String phePython(List<Integer> data, String path) {
        try {
            // Create the ProcessBuilder instance
            ProcessBuilder processBuilder = new ProcessBuilder("python", path);
            processBuilder.redirectErrorStream(true); // Combine stdout and stderr

            // Start the process
            Process process = processBuilder.start();

            // Convert the list to JSON using Gson
            String jsonData = "[" + data.stream()
                    .map(String::valueOf)
                    .collect(Collectors.joining(",")) + "]";

            // Write the JSON data to the Python process's input stream
            try (BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(process.getOutputStream()))) {
                writer.write(jsonData);
                writer.newLine();
                writer.flush();
            }

            // Read the output of the process
            StringBuilder output = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line).append("\n");
                }
            }

            // Capture errors from the Python script
            StringBuilder errorOutput = new StringBuilder();
            try (BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()))) {
                String errorLine;
                while ((errorLine = errorReader.readLine()) != null) {
                    errorOutput.append(errorLine).append("\n");
                }
            }

            // Wait for the process to complete
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new RuntimeException("Python script exited with code " + exitCode + ". Error output: " + errorOutput);
            }

            // Return the output of the process
            return output.toString().trim();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
