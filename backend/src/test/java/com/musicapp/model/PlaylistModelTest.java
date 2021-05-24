package com.musicapp.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

public class PlaylistModelTest {

    private Playlist playlist;

    @BeforeEach
    public void setUp(){
        Song track1 = new Song();
        track1.setSongId("Id1");
        Song song2 = new Song();
        song2.setSongId("Id2");
        Song song3 = new Song();
        song3.setSongId("Id3");

        List<Song> songs = new ArrayList<>();
        songs.add(track1);
        songs.add(song2);
        songs.add(song3);

        playlist = new Playlist();

        playlist.setSongs(songs);
        playlist.setUsername("User");
        playlist.setPlaylistName("Name");
        playlist.setPlaylistId("Id");
    }

    @Test
    public void playlistSongsTest(){
        List<Song> foundSongs = playlist.getSongs();
        Assertions.assertEquals("Id1",foundSongs.get(0).getSongId());
        Assertions.assertEquals("Id2",foundSongs.get(1).getSongId());
        Assertions.assertEquals("Id3",foundSongs.get(2).getSongId());
    }

    @Test
    public void playlistUserIdTest(){
        String foundUsername = playlist.getUsername();
        Assertions.assertEquals("User",foundUsername);
    }

    @Test
    public void playlistNameTest(){
        String foundName = playlist.getPlaylistName();
        Assertions.assertEquals("Name",foundName);
    }

    @Test
    public void playlistIdTest(){
        String foundId = playlist.getPlaylistId();
        Assertions.assertEquals("Id",foundId);
    }
}
