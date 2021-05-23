package com.musicapp.controller;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.musicapp.model.Playlist;
import com.musicapp.model.User;
import com.musicapp.service.PlaylistService;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

public class PlaylistControllerTest {

    private PlaylistService playlistService = Mockito.mock(PlaylistService.class);

    private PlaylistController playlistController = new PlaylistController(playlistService);

    @Test
    public void createPlaylistSuccessTest(){
        Playlist playlist = new Playlist();

        Mockito.when(playlistService.createPlaylist(playlist)).thenReturn(true);

        ResponseEntity<Playlist> result = playlistController.createPlaylist(playlist);
        Assert.assertEquals(result.getStatusCode(),HttpStatus.OK);
    }

    @Test
    public void createPlaylistFailureTest(){
        Playlist playlist = new Playlist();

        Mockito.when(playlistService.createPlaylist(playlist)).thenReturn(false);

        ResponseEntity<Playlist> result = playlistController.createPlaylist(playlist);
        Assert.assertEquals(result.getStatusCode(),HttpStatus.valueOf(401));
    }

    @Test
    public void readPlaylistTest(){
        List<Playlist> playlists = new ArrayList<>();
        Playlist playlist1 = new Playlist();

        Mockito.when(playlistService.readPlaylist("username")).thenReturn(playlists);
        ResponseEntity<List<Playlist>> result = playlistController.readPlaylist("username");
        Assert.assertEquals(result.getStatusCode(),HttpStatus.OK);

    }

    @Test
    public void updatePlaylistSuccessTest(){
        Playlist playlist = new Playlist();

        Mockito.when(playlistService.updatePlaylist(playlist)).thenReturn(playlist);
        ResponseEntity<Playlist> result = playlistController.updatePlaylist(playlist);
        Assert.assertEquals(result.getStatusCode(),HttpStatus.OK);
    }

    @Test
    public void updatePlaylistFailureTest(){
        Playlist playlist = new Playlist();

        Mockito.when(playlistService.updatePlaylist(playlist)).thenReturn(null);
        ResponseEntity<Playlist> result = playlistController.updatePlaylist(playlist);
        Assert.assertEquals(result.getStatusCode(),HttpStatus.valueOf(401));
    }

    @Test
    public void deletePlaylistTest(){
        Playlist playlist = new Playlist();

        ResponseEntity<Playlist> result = playlistController.deletePlaylist(playlist);
        Assert.assertEquals(result.getStatusCode(),HttpStatus.OK);
    }
}
