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
public class UserController {
    private final UserService userService;

    @GetMapping("/findAll")
    public ResponseEntity<List<User>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PostMapping("/save")
    public ResponseEntity<User> save(@RequestBody User request){
        return ResponseEntity.ok(userService.save(request));
    }

    @PutMapping("/update")
    public ResponseEntity<User> update(@RequestBody User request){
        return ResponseEntity.ok(userService.update(request));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<User> delete(@RequestBody User request){
        userService.delete(request.getUserId());
        return ResponseEntity.ok().build();
    }

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
