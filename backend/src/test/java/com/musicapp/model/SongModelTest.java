package com.musicapp.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class SongModelTest {

    private Song song;

    @BeforeEach
    public void setUp(){
        Artist artist = new Artist();
        artist.setArtistId("Id");

        Album album = new Album();
        album.setAlbumId("Id");

        song = new Song();
        song.setSongId("Id");
        song.setArtist(artist);
        song.setAlbum(album);
        song.setTitle("TT");
        song.setPreview("PV");
    }

    @Test
    public void songIdTest(){
        String foundId = song.getSongId();
        Assertions.assertEquals("Id",foundId);
    }

    @Test
    public void songArtistTest(){
        Artist foundArtist = song.getArtist();
        Assertions.assertEquals("Id",foundArtist.getArtistId());
    }

    @Test
    public void songAlbumTest(){
        Album foundAlbum = song.getAlbum();
        Assertions.assertEquals("Id",foundAlbum.getAlbumId());
    }

    @Test
    public void songTitleTest(){
        String foundTitle = song.getTitle();
        Assertions.assertEquals("TT",foundTitle);
    }

    @Test
    public void songPreviewTest(){
        String foundPreview = song.getPreview();
        Assertions.assertEquals("PV",foundPreview);
    }
}
