package com.musicapp.model;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class TrackModelTest {

    private Track track;

    @BeforeEach
    public void setUp(){
        Artist artist = new Artist();
        artist.setArtistId("Id");

        Album album = new Album();
        album.setAlbumId("Id");

        track = new Track();
        track.setTrackId("Id");
        track.setArtist(artist);
        track.setAlbum(album);
        track.setTitle("TT");
        track.setPreview("PV");
    }

    @Test
    public void trackIdTest(){
        String foundId = track.getTrackId();
        Assert.assertEquals("Id",foundId);
    }

    @Test
    public void trackArtistTest(){
        Artist foundArtist = track.getArtist();
        Assert.assertEquals("Id",foundArtist.getArtistId());
    }

    @Test
    public void trackAlbumTest(){
        Album foundAlbum = track.getAlbum();
        Assert.assertEquals("Id",foundAlbum.getAlbumId());
    }

    @Test
    public void trackTitleTest(){
        String foundTitle = track.getTitle();
        Assert.assertEquals("TT",foundTitle);
    }

    @Test
    public void trackPreviewTest(){
        String foundPreview = track.getPreview();
        Assert.assertEquals("PV",foundPreview);
    }
}
