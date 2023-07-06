package com.rubincomputers.todo_list.util.exception;

public class NotFoundException extends GeneralException {

    public NotFoundException() {
        super("Entity not found");
    }
    public NotFoundException(String message) {
        super("Entity not found " + message);
    }
}
