package com.example.googleauth;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//handles http requests
@RestController
public class CsrfController 
{
    @GetMapping("/csrf")
    //provides current CSRF token and sends info to frontend
    public CsrfToken csrf(CsrfToken csrfToken)
    {
        return csrfToken;
    }
}