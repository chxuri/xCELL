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
            .cors(cors -> cors.configurationSource(request -> {
                var config = new org.springframework.web.cors.CorsConfiguration();

                config.setAllowedOrigins(java.util.List.of("http://127.0.0.1:5500"));
                config.setAllowedMethods(java.util.List.of("GET", "POST"));
                config.setAllowedHeaders(java.util.List.of("*"));

                return config;
            }))

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