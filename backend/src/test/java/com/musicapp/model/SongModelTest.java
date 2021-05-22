package com.musicapp.model;

import org.junit.Assert;
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
    public void trackIdTest(){
        String foundId = song.getSongId();
        Assert.assertEquals("Id",foundId);
    }

    @Test
    public void trackArtistTest(){
        Artist foundArtist = song.getArtist();
        Assert.assertEquals("Id",foundArtist.getArtistId());
    }

    @Test
    public void trackAlbumTest(){
        Album foundAlbum = song.getAlbum();
        Assert.assertEquals("Id",foundAlbum.getAlbumId());
    }

    @Test
    public void trackTitleTest(){
        String foundTitle = song.getTitle();
        Assert.assertEquals("TT",foundTitle);
    }

    @Test
    public void trackPreviewTest(){
        String foundPreview = song.getPreview();
        Assert.assertEquals("PV",foundPreview);
    }
}
