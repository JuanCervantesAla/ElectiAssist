package com.exampleElecti.Electi.tool;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PasswordUtilEncrypt {

    //Creates an instance of Bcrypt encoder
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    //Encodes the password to a hash -> Recommended use: When register
    public String hashPassword(String password){
        return encoder.encode(password);
    }

    //Compares a rawPassword to a hashed DB stored password , Recommended use: When login
    public  Boolean verifyPassword(String rawPassword, String hashedPassword){
        return encoder.matches(rawPassword,hashedPassword);
    }

}
