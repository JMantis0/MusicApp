package com.musicapp.controller;

import com.musicapp.model.User;
import com.musicapp.service.UserService;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class UserControllerTest {

    private UserService userService = Mockito.mock(UserService.class);

    private UserController userController = new UserController(userService);

    // this is necessary to run effective tests
    @BeforeEach
    public void setUp() {

    }

    @Test
    public void logInSuccess() {
        User goodUser = new User();
        goodUser.setUsername("ValidUsername");
        goodUser.setPassword("ValidPassword");

        Mockito.when(userService.logIn(goodUser)).thenReturn(goodUser);

        ResponseEntity<User> response = userController.logIn(goodUser);

        Assert.assertEquals(response.getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void logInFailure(){
        User badUser = new User();
        badUser.setUsername("badUsername");
        badUser.setPassword("badPassword");

        Mockito.when(userService.logIn(badUser)).thenReturn(null);

        ResponseEntity<User> response = userController.logIn(badUser);

        Assert.assertEquals(response.getStatusCode(), HttpStatus.valueOf(401));
    }

    @Test
    public void logInNullUser(){
        User nullUser = new User();

        Mockito.when(userService.logIn(nullUser)).thenReturn(null);

        ResponseEntity<User> response = userController.logIn(nullUser);

        Assert.assertEquals(response.getStatusCode(), HttpStatus.valueOf(401));
    }

    @Test
    public void findUserByUsernameSuccessTest(){
        User user = new User();
        String username = "username";
        Mockito.when(userService.findByUsername(username)).thenReturn(user);
        ResponseEntity<User> response = userController.findUserByUsername(username);
        Assert.assertEquals(response.getStatusCode(),HttpStatus.OK);
    }

    @Test
    public void findUserByUsernameFailureTest(){
        String username = "noSuchName";
        Mockito.when(userService.findByUsername(username)).thenReturn(null);
        ResponseEntity<User> response = userController.findUserByUsername(username);
        Assert.assertEquals(response.getStatusCode(),HttpStatus.valueOf(401));
    }

}
