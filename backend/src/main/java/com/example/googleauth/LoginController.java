package com.example.googleauth;

import java.util.Map;
import java.util.HashMap;


import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
//authentication object
import org.springframework.security.core.Authentication;
//to retrieve name and email
import org.springframework.security.oauth2.core.user.OAuth2User;


//class that handles web requests (methods return response data)
@RestController
public class LoginController 
{
    @GetMapping("/login")
    public String login()
    {
        return "login endpoint";
    }

    @GetMapping("/user")
    public Map<String, Object> authenticate(Authentication auth)
    {
        OAuth2User user = (OAuth2User) auth.getPrincipal();

        Map<String, Object> userInfo = new HashMap<>();

        userInfo.put("name", user.getAttribute("name"));
        userInfo.put("email", user.getAttribute("email"));
        userInfo.put("picture", user.getAttribute("picture"));


        return userInfo;
    }

}