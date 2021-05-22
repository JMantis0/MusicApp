package com.musicapp.model;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

public class PlaylistModelTest {

    private Playlist playlist;

    @BeforeEach
    public void setUp(){
        Track track1 = new Track();
        track1.setTrackId("Id1");
        Track track2 = new Track();
        track2.setTrackId("Id2");
        Track track3 = new Track();
        track3.setTrackId("Id3");

        List<Track> tracks = new ArrayList<Track>();
        tracks.add(track1);
        tracks.add(track2);
        tracks.add(track3);

        playlist = new Playlist();

        playlist.setSongs(tracks);
        playlist.setUsername("User");
        playlist.setPlaylistName("Name");
    }

    @Test
    public void playlistSongsTest(){
        List<Track> foundSongs = playlist.getSongs();
        Assert.assertEquals("Id1",foundSongs.get(0).getTrackId());
        Assert.assertEquals("Id2",foundSongs.get(1).getTrackId());
        Assert.assertEquals("Id3",foundSongs.get(2).getTrackId());
    }

    @Test
    public void playlistUserIdTest(){
        String foundUsername = playlist.getUsername();
        Assert.assertEquals("User",foundUsername);
    }

    @Test
    public void playlistNameTest(){
        String foundName = playlist.getPlaylistName();
        Assert.assertEquals("Name",foundName);
    }
}
