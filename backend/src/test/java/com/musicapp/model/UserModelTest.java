package com.musicapp.model;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
public class UserModelTest {

    private User user;

    @BeforeEach
    public void setUp(){
        user = new User();
        user.setUserId("Id");
        user.setFirstName("FN");
        user.setLastName("LN");
        user.setUsername("UN");
        user.setPassword("PW");
    }

    @Test
    public void userIDTest(){
        String foundID = user.getUserId();
        Assert.assertEquals("Id",foundID);
    }

    @Test
    public void userFirstNameTest(){
        String foundFirstName = user.getFirstName();
        Assert.assertEquals("FN",foundFirstName);
    }

    @Test
    public void userLastNameTest(){
        String foundLastName = user.getLastName();
        Assert.assertEquals("LN",foundLastName);
    }

    @Test
    public void userUsernameTest(){
        String foundUsername = user.getUsername();
        Assert.assertEquals("UN",foundUsername);
    }

    @Test
    public void userPasswordTest(){
        String foundPassword = user.getPassword();
        Assert.assertEquals("PW",foundPassword);
    }
}
