package com.musicapp.controller;

import com.musicapp.model.Playlist;
import com.musicapp.model.Song;
import com.musicapp.service.PlaylistService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

public class PlaylistControllerTest {

    private final PlaylistService playlistService = Mockito.mock(PlaylistService.class);

    private final PlaylistController playlistController = new PlaylistController(playlistService);

    @Test
    public void createPlaylistSuccessTest(){
        Playlist playlist = new Playlist();

        Mockito.when(playlistService.createPlaylist(playlist)).thenReturn(true);

        ResponseEntity<Playlist> result = playlistController.createPlaylist(playlist);
        Assertions.assertEquals(result.getStatusCode(),HttpStatus.OK);
    }

    @Test
    public void createPlaylistFailureTest(){
        Playlist playlist = new Playlist();

        Mockito.when(playlistService.createPlaylist(playlist)).thenReturn(false);

        ResponseEntity<Playlist> result = playlistController.createPlaylist(playlist);
        Assertions.assertEquals(result.getStatusCode(),HttpStatus.valueOf(401));
    }

    @Test
    public void readPlaylistTest(){
        List<Playlist> playlists = new ArrayList<>();

        Mockito.when(playlistService.readPlaylist("username")).thenReturn(playlists);
        ResponseEntity<List<Playlist>> result = playlistController.readPlaylist("username");
        Assertions.assertEquals(result.getStatusCode(),HttpStatus.OK);

    }

    @Test
    public void readPlaylistSongsByPlaylistIdSuccessTest(){
        String playlistId = "good Id";
        List<Song> songs = new ArrayList<>();
        Mockito.when(playlistService.readPlaylistSongsByPlaylistId(playlistId)).thenReturn(songs);

        ResponseEntity<List<Song>> result = playlistController.readPlaylistSongsByPlaylistId(playlistId);
        Assertions.assertEquals(result.getStatusCode(),HttpStatus.OK);
    }

    @Test
    public void readPlaylistSongsByPlaylistIdFailureTest(){
        String playlistId = "bad Id";
        Mockito.when(playlistService.readPlaylistSongsByPlaylistId(playlistId)).thenReturn(null);

        ResponseEntity<List<Song>> result = playlistController.readPlaylistSongsByPlaylistId(playlistId);
        Assertions.assertEquals(result.getStatusCode(),HttpStatus.valueOf(401));
    }

    @Test
    public void updatePlaylistSuccessTest(){
        Playlist playlist = new Playlist();

        Mockito.when(playlistService.updatePlaylist(playlist)).thenReturn(playlist);
        ResponseEntity<Playlist> result = playlistController.updatePlaylist(playlist);
        Assertions.assertEquals(result.getStatusCode(),HttpStatus.OK);
    }

    @Test
    public void updatePlaylistFailureTest(){
        Playlist playlist = new Playlist();

        Mockito.when(playlistService.updatePlaylist(playlist)).thenReturn(null);
        ResponseEntity<Playlist> result = playlistController.updatePlaylist(playlist);
        Assertions.assertEquals(result.getStatusCode(),HttpStatus.valueOf(401));
    }

    @Test
    public void updatePlaylistSongsSuccessTest(){
        String playlistId = "goodId";
        Song song = new Song();
        Playlist playlist = new Playlist();

        Mockito.when(playlistService.updatePlaylistSongs(playlistId,song)).thenReturn(playlist);

        ResponseEntity<Playlist> result = playlistController.updatePlaylistSongs(playlistId,song);

        Assertions.assertEquals(result.getStatusCode(),HttpStatus.OK);
    }

    @Test
    public void updatePlaylistSongsFailureTest(){
        String playlistId = "badId";
        Song song = new Song();

        Mockito.when(playlistService.updatePlaylistSongs(playlistId,song)).thenReturn(null);

        ResponseEntity<Playlist> result = playlistController.updatePlaylistSongs(playlistId,song);

        Assertions.assertEquals(result.getStatusCode(),HttpStatus.valueOf(401));
    }

    @Test
    public void deletePlaylistTest(){
        Playlist playlist = new Playlist();

        ResponseEntity<Playlist> result = playlistController.deletePlaylist(playlist);
        Assertions.assertEquals(result.getStatusCode(),HttpStatus.OK);
    }

}
