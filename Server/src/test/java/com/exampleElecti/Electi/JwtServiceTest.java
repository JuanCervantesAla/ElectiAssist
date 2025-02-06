package com.exampleElecti.Electi;

import com.exampleElecti.Electi.service.JwtService;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import static org.assertj.core.api.Assertions.assertThat;

public class JwtServiceTest {

    private JwtService jwtService;

    @BeforeEach//Before each means to do this every @test
    void setUp(){
        jwtService = new JwtService();//Creates a new instances everytime a test its executed
    }

    @Test
    public void shouldGenerateValidToken(){//Validates the token
        String username = "testuser";
        String token = jwtService.generateToken(username);//Creates the token with username

        assertThat(token).isNotNull();//Verifies that is not null
        assertThat(jwtService.validateToken(token)).isTrue();//Invokes the validate function
        assertThat(jwtService.extractUsername(token)).isEqualTo(username);//Extracts the username and compares it to the original

    }

    @Test
    public void shouldInvalidateToken(){//Validates the token itself
        String token = jwtService.generateToken("testUser");//Creates the token with username
        String invalidToken = token.replace("a", "b");//Replaces from the token a character to make it different

        assertThat(jwtService.validateToken(invalidToken)).isFalse();//Compares if it is false
    }

    @Test
    public void shouldExtractUsername(){//This function should extract the name
        String username = "testUser";
        String token = jwtService.generateToken(username);//Same token generating way

        String extractedUsername = jwtService.extractUsername(token);//Extracts the user
        assertThat(extractedUsername).isEqualTo(username);//f its equal to the original then its correct

    }

}
