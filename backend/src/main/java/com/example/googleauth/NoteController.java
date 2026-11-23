package com.example.googleauth;

//helps route HTTP requests to java methods
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import java.util.List;

//for checking note ownership
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

//handles http requests and returns data
@RestController
//base url for all endpoints in controller
@RequestMapping("/notes")
public class NoteController
{   
    //automatically creats instance of NoteRepository when controller created
    private final NoteRepository noteRepository;

    public NoteController(NoteRepository n)
    {
        noteRepository = n;
    }

    @GetMapping
    public List<Note> getNotes(Authentication auth)
    {
        OAuth2User user = (OAuth2User) auth.getPrincipal();

        String id = user.getAttribute("sub");
        List<Note> notes = noteRepository.findByUserId(id);

        return notes;
    }

    @PostMapping
    public Note createNote(Authentication auth, @RequestBody NoteRequest request)
    {
        OAuth2User user = (OAuth2User) auth.getPrincipal();

        Note newNote = new Note(request.getTitle(), request.getContent(), user.getAttribute("sub"));

        Note savedNote = noteRepository.save(newNote);

        return savedNote;
    }

    @PutMapping("/{id}")
    public Note updateNote(@PathVariable Long id, Authentication auth, @RequestBody NoteRequest request)
    {
        OAuth2User user = (OAuth2User) auth.getPrincipal();
        //creates exception if optional empty
        Note currentNote = noteRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if(user.getAttribute("sub").equals(currentNote.getUserId()))
        {
            currentNote.setTitle(request.getTitle());
            currentNote.setContent(request.getContent());
            
        }
        else
        {
            //note doesn't exist/isn't accesible
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        Note savedNote = noteRepository.save(currentNote);
        return savedNote;
    }

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable Long id, Authentication auth)
    {
        OAuth2User user = (OAuth2User) auth.getPrincipal();
        //creates exception if optional empty
        Note currentNote = noteRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if(user.getAttribute("sub").equals(currentNote.getUserId()))
        {
            noteRepository.delete(currentNote);
            
        }
        else
        {
            //note doesn't exist/isn't accesible
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

}