package com.musicapp.service;

import com.musicapp.model.User;
import com.musicapp.repository.UserRepository;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.Mockito;

public class UserServiceTest {

    private UserRepository userRepository = Mockito.mock(UserRepository.class);

    private UserService userService = new UserService(userRepository);

    // this is necessary to run effective tests
    @BeforeEach
    public void setUp() {

    }

    @Test
    public void logInSuccess() {

        User goodUser = new User();
        goodUser.setPassword("Password");
        goodUser.setUsername("Username");
        goodUser.setUserId("1234");

        Mockito.when(userRepository.findByUsername(goodUser.getUsername()))
                .thenReturn(goodUser);

        User user = new User();
        user.setUsername("Username");
        user.setPassword("Password");
        user.setUserId("1234");

        User foundUser = userService.logIn(user);

        Assert.assertEquals(foundUser.getUserId(),user.getUserId());
    }

    @Test
    public void logInFailure(){
        User goodUser = new User();
        goodUser.setPassword("BadPassword");
        goodUser.setUsername("Username");
        goodUser.setUserId("1234");

        Mockito.when(userRepository.findByUsername(goodUser.getUsername()))
                .thenReturn(goodUser);

        User user = new User();
        user.setUsername("Username");
        user.setPassword("Password");
        user.setUserId("1234");

        User foundUser = userService.logIn(user);

        Assert.assertNull(foundUser);
    }

    @Test
    public void logInNull(){
        User nullUser = new User();

        Mockito.when(userRepository.findByUsername("noSuchName")).thenReturn(null);

        User foundUser = userService.logIn(nullUser);

        Assert.assertNull(foundUser);
    }
}
