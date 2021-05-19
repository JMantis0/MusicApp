package com.musicapp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.stereotype.Component;

@Data
public class User {
    @Id
    String userId;
    String firstName;
    String lastName;
    String username;
    String password;
}
