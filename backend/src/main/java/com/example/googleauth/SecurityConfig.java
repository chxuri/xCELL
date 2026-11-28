package com.example.googleauth;

import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.http.HttpStatus;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.servlet.util.matcher.PathPatternRequestMatcher;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

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

                config.setAllowedOrigins(java.util.List.of("https://xcell-shs.netlify.app"));
                //options for preflight request
                config.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                config.setAllowedHeaders(java.util.List.of("*"));
                //allows necessary cookie for spring
                config.setAllowCredentials(true);

                return config;
            }))

            //tells spring how to set up csrf protection for frontend
            .csrf(csrf -> csrf
                .csrfTokenRepository(
                    CookieCsrfTokenRepository.withHttpOnlyFalse()
                    .setCookieCustomizer(cookie -> cookie
                        .sameSite("None")
                        .secure(true)
                    )
                )
                .csrfTokenRequestHandler(
                    new CsrfTokenRequestAttributeHandler()
                )
            )


            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/login", "/csrf").permitAll()
                //only users with authentication can use
                .anyRequest().authenticated()
            )

            .exceptionHandling(ex -> ex
                .defaultAuthenticationEntryPointFor(
                    new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED),
                    PathPatternRequestMatcher.withDefaults().matcher("/user")
                )
                .defaultAuthenticationEntryPointFor(
                    new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED),
                    PathPatternRequestMatcher.withDefaults().matcher("/notes")
                )
                .defaultAuthenticationEntryPointFor(
                    new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED),
                    PathPatternRequestMatcher.withDefaults().matcher("/notes/**")
                )
            )

            //to disable Spring's automatic login page
            .formLogin(form -> form.disable())
            //not using basic authentication b/c going to use Google login
            .httpBasic(basic -> basic.disable())
            //enables oauth2 login & sets url to redirect to after success (true->always redirect there)
            .oauth2Login(oauth -> oauth.defaultSuccessUrl("https://xcell-shs.netlify.app/pages/index.html", true));

        return http.build();
    }
}