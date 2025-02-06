package com.exampleElecti.Electi;

import com.exampleElecti.Electi.service.PythonService;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

@SpringBootTest
@EnableAsync // Make all the methods to be asyncronous
public class PythonServiceTest {

    @Autowired
    private PythonService pythonService;

    @BeforeEach
    void setup(){//No need of make an instance cause already have one

    }

    @Test
    public void testExecutePython() throws ExecutionException, InterruptedException{
        List<Integer> data = Arrays.asList(1,2,3,4,5);
        String path = "src/main/resources/scripts/script.py";

        CompletableFuture<String> resultFuture = pythonService.executePythonAsync(data,path);

        String result = resultFuture.get();

        assertNotNull(result, "The result must not be null");
    }

}
