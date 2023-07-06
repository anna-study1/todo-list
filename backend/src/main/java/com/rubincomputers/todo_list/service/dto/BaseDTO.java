package com.rubincomputers.todo_list.service.dto;


import com.rubincomputers.todo_list.HasId;
import lombok.*;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@EqualsAndHashCode
@SuperBuilder
public abstract class BaseDTO implements HasId {
    protected Long id;
}
