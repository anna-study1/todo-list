package com.rubincomputers.todo_list.web.controller;

import com.rubincomputers.todo_list.model.Note;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = NoteRest.REST_URL, produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
public class NoteRest {

    static final String REST_URL = "/rest/notes";

    @GetMapping(value = {"", "/"})
    public List<Note> getNotes() {
        return null;
    }


}
