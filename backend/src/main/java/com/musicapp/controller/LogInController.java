package com.musicapp.controller;

import com.musicapp.model.User;
import com.musicapp.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class LogInController {
    private final UserService userService;


    // log in
    @PostMapping("/attempt_login")
    public ResponseEntity<User> logIn(@RequestBody User request) {
        User user = userService.logIn(request);
        if (user == null) {
             return new ResponseEntity<User>(user, HttpStatus.valueOf(401));
        }
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }
}