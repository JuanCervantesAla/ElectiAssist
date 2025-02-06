package com.exampleElecti.Electi.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Date;

/*
*
* @Author: Juan Cervantes
* @Date: 1/21/2025
* @About: Token Class Generator
*
* */

@Service
public class JwtService {

    //Create the key with a 256 hash
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long expirationTime = 86400000;// The time for token expiration

    //Generating the token with the username
    public String generateToken(String username){
        return Jwts.builder()//Returns the token with the builder
                .setSubject(username)//User about(most explicit: name)
                .setIssuedAt(new Date())//Issued date
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))//The expiration time, about a day from generated
                .signWith(key)//Signs the token with the secret key(hash256)
                .compact();
    }

    //Validating if the token is
    public boolean validateToken(String token){
        try{
            //Checks the token if the given key matches with the token key
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e){//If the token is invalid or expired
            return false;
        }
    }

    public String extractUsername(String token){
        Claims claims = Jwts.parserBuilder()//With the builder
                .setSigningKey(key)//The class key
                .build()
                .parseClaimsJws(token)//If matches
                .getBody();//Get body : username
        return claims.getSubject();// return the claims body = username
    }

}
