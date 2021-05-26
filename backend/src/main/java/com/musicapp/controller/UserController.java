package com.musicapp.controller;

import com.musicapp.model.User;
import com.musicapp.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for all user requests. Handles logging in a user as well as updating user information.
 */
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@AllArgsConstructor
@Slf4j
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
            log.error("Cannot log in : empty field in username or password");
            return new ResponseEntity<>(HttpStatus.valueOf(401));
        }
        User user = userService.logIn(request);

        if (user == null) {
            log.error("Cannot log in, user does not exist");
            return new ResponseEntity<>(HttpStatus.valueOf(401));
        }
        log.info("Successfully logged in User : {}",user.getUsername());
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    /*
    *
    * Create
    *
    * */

    /**
     * Creates a new user
     * @param user Takes a user
     * @return The new user, 401 if already exists
     */
    @PostMapping("/create/user")
    public ResponseEntity<User> createUser(@RequestBody User user){
        if (user.getUsername() == null || user.getPassword() == null){
            log.error("Failure to create User : {}. Username and Password must be filled.",user.getUsername());
            return new ResponseEntity<>(HttpStatus.valueOf(401));
        }
        User foundUser = userService.findByUsername(user.getUsername());
        if (foundUser != null){
            log.error("Failure to create User : {}. User already exists",user.getUsername());
            return new ResponseEntity<>(HttpStatus.valueOf(401));
        }
        userService.createUser(user);
        log.info("Successfully created User : {}.",user.getUsername());
        return new ResponseEntity<>(user,HttpStatus.OK);
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
            log.error("Failed to read User : {}. Does not exist",username);
            return new ResponseEntity<>(HttpStatus.valueOf(401));
        }
        log.info("Successfully read User : {}",username);
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
    public ResponseEntity<User> update(@RequestBody User user){
        log.info("Deleted User : {}",user.getUsername());
        return ResponseEntity.ok(userService.updateUser(user));
    }

    /*
    *
    * Delete
    *
    * */


}
