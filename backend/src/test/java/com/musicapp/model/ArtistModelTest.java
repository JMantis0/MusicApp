package com.musicapp.model;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class ArtistModelTest {
    private Artist artist;

    @BeforeEach
    public void setUp(){
        artist = new Artist();
        artist.setArtistId("Id");
        artist.setName("Name");
        artist.setPicture("Pic");
    }

    @Test
    public void artistIdTest(){
        String foundId = artist.getArtistId();
        Assert.assertEquals("Id",foundId);
    }

    @Test
    public void artistNameTest(){
        String foundName = artist.getName();
        Assert.assertEquals("Name",foundName);
    }

    @Test
    public void artistPictureTest(){
        String foundPicture = artist.getPicture();
        Assert.assertEquals("Pic",foundPicture);
    }
}
