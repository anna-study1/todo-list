package com.rubincomputers.todo_list.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;

@NoArgsConstructor
@Data
@ToString(callSuper = true)
@SuperBuilder
@Entity
@Table(name = "rc_note")
public class Note extends AbstractBaseEntity {

    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "color", nullable = false)
    private String color;

    @Column(name = "is_completed", nullable = false)
    private Boolean isCompleted;

    @Column(name = "date_time", nullable = false)
    //@JsonFormat(pattern = "MM/dd/yyyy, hh:mm:ss a")
    @JsonFormat(pattern = "M/d/yyyy, h:mm:ss a")
    
    private LocalDateTime dateTime;


}
