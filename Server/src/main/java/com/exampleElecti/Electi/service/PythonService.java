package com.exampleElecti.Electi.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
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
