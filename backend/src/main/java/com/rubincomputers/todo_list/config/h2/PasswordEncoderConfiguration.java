package com.rubincomputers.todo_list.config.h2;

import com.rubincomputers.todo_list.util.passwordencoder.PasswordEncoder;
import com.rubincomputers.todo_list.util.passwordencoder.PasswordEncoderImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PasswordEncoderConfiguration {

    @Bean
    public PasswordEncoder getPasswordEncoder(){
        return new PasswordEncoderImpl();
    }
}
