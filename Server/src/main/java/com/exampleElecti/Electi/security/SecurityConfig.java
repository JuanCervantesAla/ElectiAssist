package com.exampleElecti.Electi.security;

import com.exampleElecti.Electi.service.JwtService;
import org.apache.catalina.User;
import org.apache.catalina.filters.ExpiresFilter;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/*Config to secure all the endpoints*/

@Configuration
public class SecurityConfig {

    //Authentication filter
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    //Constructor
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(//All the endpoints accesible
                                "/api/user/register",
                                "/api/user/login",
                                "/api/user",
                                "/api/user/{id}",
                                "/api/candidate",
                                "/api/candidate/updateAll",
                                "/api/images/upload/{id}",
                                "/api/images/download/{id}",
                                "/api/political_party/add",
                                "/api/political_party",
                                "/api/political_party/image/{id}",
                                "/api/article/image/{id}",
                                "/api/article/add",
                                "/api/article",
                                "/api/news",
                                "/api/news/add",
                                "/api/news/image/{id}",
                                "/api/casilla",
                                "/api/casilla/updateAll",
                                "/api/casilla/{section}/{state}/{type}",
                                "/api/vote/add",
                                "/api/vote/count_votes",
                                "/api/vote/count_votes/{position}/{state}"
                        ).permitAll()//Allow public to login
                        .anyRequest().authenticated()//Secure the rest of the endpoints
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);//Jwt Filter

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

}
