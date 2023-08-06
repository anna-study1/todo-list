package com.rubincomputers.todo_list.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDateTime;

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
    private LocalDateTime dateTime;


}
