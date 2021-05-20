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

        playlist.setTracks(tracks);
    }

    @Test
    public void playlistTracksTest(){
        List<Track> foundTracks = playlist.getTracks();
        Assert.assertEquals("Id1",foundTracks.get(0).getTrackId());
        Assert.assertEquals("Id2",foundTracks.get(1).getTrackId());
        Assert.assertEquals("Id3",foundTracks.get(2).getTrackId());
    }
}
