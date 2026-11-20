package com.example.googleauth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig 
{
    //Spring object
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception 
    {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/login").permitAll()
                //all other requests blocked
                .anyRequest().denyAll()
            )
            //to disable Spring's automatic login page
            .formLogin(form -> form.disable())
            //not using basic authentication b/c going to use Google login
            .httpBasic(basic -> basic.disable());

        return http.build();
    }
}