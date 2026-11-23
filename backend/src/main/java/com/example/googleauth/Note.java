package com.example.googleauth;

//to develop db table through class
import jakarta.persistence.*;

@Entity
@Table(name = "notes")
public class Note 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    private String userId;

    public Note()
    {

    }

    public Note(String t, String c, String u)
    {
        title = t;
        content = c;
        userId = u;
    }

    public String getTitle()
    {
        return title;
    }

    public String getContent()
    {
        return content;
    }

    public String getUserId()
    {
        return userId;
    }

    public void setTitle(String t)
    {
        title = t;
    }

    public void setContent(String c)
    {
        content = c;
    }

    public void setUserId(String u)
    {
        userId = u;
    }



}