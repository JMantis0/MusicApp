package com.musicapp.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.stereotype.Component;

@Data
@Component("user")
public class User {
    String userId;
    String firstName;
    String lastName;
    String username;
    String password;
}