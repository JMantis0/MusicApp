package com.musicapp.service;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.musicapp.model.Playlist;
import com.musicapp.model.User;
import com.musicapp.repository.PlaylistRepository;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;

public class PlaylistServiceTest {
    private PlaylistRepository playlistRepository = Mockito.mock(PlaylistRepository.class);

    private PlaylistService playlistService = new PlaylistService(playlistRepository);

    @Test
    public void createPlaylistSuccessTest(){
        Playlist playlist = new Playlist();

        Mockito.when(playlistRepository.findByUsernameAndPlaylistName(
                playlist.getUsername(),
                playlist.getPlaylistName()
            )).thenReturn(
                playlist);


        boolean result = playlistService.createPlaylist(playlist);

        Assert.assertFalse(result);
    }

    @Test
    public void createPlaylistFailureTest(){
        Playlist playlist = new Playlist();

        Mockito.when(playlistRepository.findByUsernameAndPlaylistName(
                playlist.getUsername(),
                playlist.getPlaylistName()
            )).thenReturn(
                null);

        boolean result = playlistService.createPlaylist(playlist);

        Assert.assertTrue(result);
    }

    @Test
    public void readPlaylistTest(){
        User user = new User();
        user.setUsername("username");

        Playlist playlist = new Playlist();
        playlist.setPlaylistName("Playlist Name");

        List<Playlist> playlists = new ArrayList<>();
        playlists.add(playlist);

        Mockito.when(playlistRepository.findByUsername(user.getUsername())).thenReturn(playlists);

        List<Playlist> foundPlaylists = playlistService.readPlaylist(user);
        Assert.assertEquals("Playlist Name", foundPlaylists.get(0).getPlaylistName());
    }

    @Test
    public void updatePlaylistSuccessTest(){
        Playlist playlist = new Playlist();
        playlist.setPlaylistName("pName");
        playlist.setUsername("uName");
        Mockito.when(playlistRepository.findByUsernameAndPlaylistName(
                playlist.getUsername(),
                playlist.getPlaylistName()))
            .thenReturn(playlist);

        Playlist foundPlaylist = playlistService.updatePlaylist(playlist);

        Assert.assertEquals(playlist, foundPlaylist);

    }

    @Test
    public void updatePlaylistFailureTest(){
        Playlist playlist = new Playlist();
        playlist.setPlaylistName("pName");
        playlist.setUsername("uName");
        Mockito.when(playlistRepository.findByUsernameAndPlaylistName(
                playlist.getUsername(),
                playlist.getPlaylistName()))
                .thenReturn(null);

        Playlist foundPlaylist = playlistService.updatePlaylist(playlist);

        Assert.assertNull(foundPlaylist);
    }
}
