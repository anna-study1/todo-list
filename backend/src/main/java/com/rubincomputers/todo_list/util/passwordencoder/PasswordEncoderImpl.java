package com.rubincomputers.todo_list.util.passwordencoder;

public class PasswordEncoderImpl implements PasswordEncoder {
    @Override
    public String encode(String rawPassword) {
        return rawPassword;
    }
}
