package com.example.googleauth;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


//class that handles web requests (methods return response data)
@RestController
public class LoginController 
{
    @GetMapping("/login")
    public String login()
    {
        return "login endpoint";
    }
}