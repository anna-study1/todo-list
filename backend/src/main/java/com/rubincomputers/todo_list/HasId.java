package com.rubincomputers.todo_list;

import com.fasterxml.jackson.annotation.JsonIgnore;

public interface HasId {
    Long getId();

    void setId(Long id);

    @JsonIgnore
    default boolean isNew() {
        return getId() == null;
    }


}
