package com.rubincomputers.todo_list.repository;

import com.rubincomputers.todo_list.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

}

