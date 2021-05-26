package com.musicapp.service;

import com.musicapp.model.User;
import com.musicapp.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import org.mockito.Mockito;

public class UserServiceTest {

    private final UserRepository userRepository = Mockito.mock(UserRepository.class);

    private final UserService userService = new UserService(userRepository);

    /*
     *
     *  Log in tests
     *
     */

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

        Assertions.assertEquals(foundUser.getUserId(),user.getUserId());
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

        Assertions.assertNull(foundUser);
    }

    @Test
    public void logInNull(){
        User nullUser = new User();

        Mockito.when(userRepository.findByUsername("noSuchName")).thenReturn(null);

        User foundUser = userService.logIn(nullUser);

        Assertions.assertNull(foundUser);
    }

    /*
    *
    * Creation tests
    *
    * */

    @Test
    public void createUserTest(){
        User user = new User();
        userService.createUser(user);
    }

    /*
    *
    * Read Tests
    *
    * */

    @Test
    public void findUserByUsernameTest(){
        User user = new User();
        String username = "username";
        Mockito.when(userRepository.findByUsername(username)).thenReturn(user);
        User foundUser = userService.findByUsername(username);
        Assertions.assertEquals(user,foundUser);
    }

    /*
    *
    * Update Tests
    *
    * */

    @Test
    public void updateUserSuccessTest(){
        User user = new User();
        user.setUsername("goodUsername");

        Mockito.when(userRepository.findByUsername(user.getUsername())).thenReturn(user);

        User foundUser = userService.updateUser(user);
        Assertions.assertEquals(user,foundUser);
    }

    @Test
    public void updateUserFailureTest(){
        User user = new User();
        user.setUsername("badUsername");

        Mockito.when(userRepository.findByUsername(user.getUsername())).thenReturn(null);

        User foundUser = userService.updateUser(user);
        Assertions.assertNull(foundUser);
    }

    /*
    *
    * Delete Tests
    *
    * */
}
