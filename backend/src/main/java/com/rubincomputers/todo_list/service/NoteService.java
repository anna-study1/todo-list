package com.rubincomputers.todo_list.service;

import com.rubincomputers.todo_list.model.Note;
import com.rubincomputers.todo_list.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    public List<Note> getAll(){
        return noteRepository.findAll();
    }

    public Note create(Note note) {
        return noteRepository.save(note);
    }

    public void deleteById(long id) {
        noteRepository.deleteById(id);
    }
}
