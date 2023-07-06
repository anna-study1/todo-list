package com.rubincomputers.todo_list.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@NoArgsConstructor
@Data
@ToString(callSuper = true)
@SuperBuilder
@Entity
@Table(name = "rc_post")
public class Note extends AbstractBaseEntity{

    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "color", nullable = false)
    private String color;

    @Column(name = "is_ompleted", nullable = false)
    private Boolean isCompleted;











}
