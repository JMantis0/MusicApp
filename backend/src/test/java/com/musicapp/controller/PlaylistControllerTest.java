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

    /*
    *
    * Create tests
    *
    * */
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

    /*
    *
    * Read Tests
    *
    * */

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
    public void readPlaylistSongsMultipleTest(){
        String playlistId = "goodId";

        Playlist playlist = new Playlist();

        Song song = new Song();

        List<Song> songs = new ArrayList<>();

        songs.add(song);

        Mockito.when(playlistService.updatePlaylistSongs(playlistId,song)).thenReturn(playlist);
        Mockito.when(playlistService.readPlaylistById(playlistId)).thenReturn(playlist);

        ResponseEntity<Playlist> response = playlistController.updatePlaylistSongsMultiple(playlistId,songs);

        Assertions.assertEquals(response.getStatusCode(),HttpStatus.OK);
    }

    /*
    *
    * Update Tests
    *
    * */

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

    /*
    *
    * Delete Tests
    *
    * */

    @Test
    public void deletePlaylistTest(){
        String playlistId = "goodId";

        Playlist playlist = new Playlist();
        playlist.setUsername("goodUser");

        Mockito.when(playlistService.readPlaylistById(playlistId)).thenReturn(playlist);

        ResponseEntity<List<Playlist>> result = playlistController.deletePlaylist(playlistId);
        Assertions.assertEquals(result.getStatusCode(),HttpStatus.OK);
    }

    @Test
    public void deletePlaylistSongSuccessTest(){
        String playlistId = "goodId";
        String songId = "goodId";
        Playlist playlist = new Playlist();

        Mockito.when(playlistService.deletePlaylistSong(playlistId,songId)).thenReturn(playlist);

        ResponseEntity<Playlist> response = playlistController.deletePlaylistSong(playlistId,songId);

        Assertions.assertEquals(response.getStatusCode(),HttpStatus.OK);

    }

    @Test
    public void deletePlaylistSongFailureTest(){
        String playlistId = "badId";
        String songId = "badId";

        Mockito.when(playlistService.deletePlaylistSong(playlistId,songId)).thenReturn(null);

        ResponseEntity<Playlist> response = playlistController.deletePlaylistSong(playlistId,songId);

        Assertions.assertEquals(response.getStatusCode(),HttpStatus.valueOf(401));
    }
}
