package com.musicapp.controller;

import com.musicapp.model.Playlist;
import com.musicapp.service.PlaylistService;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class PlaylistControllerTest {

    private PlaylistService playlistService = Mockito.mock(PlaylistService.class);

    private PlaylistController playlistController = new PlaylistController(playlistService);

    @Test
    public void createPlaylistTest(){
        Playlist playlist = new Playlist();
        ResponseEntity<Playlist> result = playlistController.createPlaylist(playlist);
        Assert.assertEquals(result.getStatusCode(), HttpStatus.OK);
    }
}
