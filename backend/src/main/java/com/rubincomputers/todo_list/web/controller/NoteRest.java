package com.rubincomputers.todo_list.web.controller;

import com.rubincomputers.todo_list.model.Note;
import com.rubincomputers.todo_list.service.NoteService;
import com.rubincomputers.todo_list.util.ValidationUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = NoteRest.REST_URL, produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
public class NoteRest {

    static final String REST_URL = "/rest/notes";

    @Autowired
    private NoteService noteService;

    @GetMapping(value = {"", "/"})
    public List<Note> getNotes() {
        return noteService.getAll();
    }

    @PostMapping(value = {"", "/"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Note> createNote(@Valid @RequestBody Note note) {
        Note created = noteService.create(note);
        URI uriOfNewResource = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path(REST_URL + "/{id}")
                .buildAndExpand(created.getId()).toUri();
        return ResponseEntity.created(uriOfNewResource).body(created);
    }


    @DeleteMapping(value = {"/{id}"})
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteNote(@PathVariable long id) {
        noteService.deleteById(id);
    }

    @PutMapping(value = {"/{id}"})
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateNote(@RequestBody Note note, @PathVariable long id) {
        ValidationUtil.assureIdConsistent(note, id);
        noteService.create(note);
    }


}
