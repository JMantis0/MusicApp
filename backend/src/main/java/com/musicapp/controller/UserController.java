package com.musicapp.controller;

import com.musicapp.model.User;
import com.musicapp.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for all user requests. Handles logging in a user as well as updating user information.
 */
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@AllArgsConstructor
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    /*
    *
    * Log in
    *
    * */

    /**
     * Logs in a user. Takes a request and converts it into a pojo
     * @param request The request converted into a user pojo. Only contains the "username" and "password" fields
     * @return The response entity of the log in attempt. Will be 200 if successful and 401 if not
     */
    @PostMapping("/login")
    public ResponseEntity<User> logIn(@RequestBody User request) {
        if (request.getPassword() == null || request.getUsername() == null){
            return new ResponseEntity<>(HttpStatus.valueOf(401));
        }
        User user = userService.logIn(request);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.valueOf(401));
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    /*
    *
    * Read
    *
    * */

    /**
     * Takes a string and finds a particular user with that particular username
     * @param username The username to find
     * @return The response entity containing the user
     */
    @GetMapping("/read/user/username")
    public ResponseEntity<User> findUserByUsername(@RequestParam String username){
        User foundUser = userService.findByUsername(username);
        if (foundUser == null){
            return new ResponseEntity<>(HttpStatus.valueOf(401));
        }
        return new ResponseEntity<>(foundUser,HttpStatus.OK);
    }

    /*
    *
    * Create
    *
    * */

    /*
    *
    * Update
    *
    * */

    @PutMapping("/update/user")
    public ResponseEntity<User> update(@RequestBody User request){
        return ResponseEntity.ok(userService.updateUser(request));
    }

    /*
    *
    * Delete
    *
    * */


}
