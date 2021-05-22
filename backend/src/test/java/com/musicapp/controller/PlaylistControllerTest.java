package com.musicapp.controller;

import com.musicapp.model.Playlist;
import com.musicapp.model.User;
import com.musicapp.service.PlaylistService;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

public class PlaylistControllerTest {

    private PlaylistService playlistService = Mockito.mock(PlaylistService.class);

    private PlaylistController playlistController = new PlaylistController(playlistService);

    @Test
    public void createPlaylistTest(){
        Playlist playlist = new Playlist();
        ResponseEntity<Playlist> result = playlistController.createPlaylist(playlist);
        Assert.assertEquals(result.getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void readPlaylistTest(){
        User user = new User();
        List<Playlist> playlists = new ArrayList<>();
        Playlist playlist1 = new Playlist();

        Mockito.when(playlistService.readPlaylist(user)).thenReturn(playlists);
        ResponseEntity<List<Playlist>> result = playlistController.readPlaylist(user);
        Assert.assertEquals(result.getStatusCode(),HttpStatus.OK);

    }
}
