package com.musicapp.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class AlbumModelTest {
    private Album album;

    @BeforeEach
    public void setUp(){
        album = new Album();
        album.setAlbumId("Id");
        album.setCover("CV");
        album.setTitle("TT");
    }

    @Test
    public void albumIdTest(){
        String foundId = album.getAlbumId();
        Assertions.assertEquals("Id",foundId);
    }

    @Test
    public void albumCoverTest(){
        String foundCover = album.getCover();
        Assertions.assertEquals("CV",foundCover);
    }

    @Test
    public void albumTitleTest(){
        String foundTitle = album.getTitle();
        Assertions.assertEquals("TT",foundTitle);
    }
}
