package com.exampleElecti.Electi.security;
import com.exampleElecti.Electi.service.JwtService;

import jakarta.servlet.ServletException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.ArrayList;

/*
* @Author:Juan Cervantes
* @Date: 1/21/2025
* @About: Checks and filters the given token
* */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    /********* ATTRIBUTES*********/
    private final JwtService jwtService;//Java web token instance

    /*********CONSTRUCTOR*********/
    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws JwtException, IOException, ServletException {
        String authorizationHeader = request.getHeader("Authorization");//Checks if the request have the Authorization header
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){//Check if it starts with Bearer (for Java tokens)
            String token = authorizationHeader.substring(7);//(Extracts the token)
            if(jwtService.validateToken(token)){//Validate the token
                String username = jwtService.extractUsername(token);//Extracts the username(email)
                SecurityContextHolder.getContext().setAuthentication(//Set the authentication
                        new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>())
                );
            }
        }

        chain.doFilter(request, response);//Let the authentication pass through

    }
}
