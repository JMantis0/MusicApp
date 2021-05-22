package com.musicapp.service;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.musicapp.model.Playlist;
import com.musicapp.model.User;
import com.musicapp.repository.PlaylistRepository;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;

public class PlaylistServiceTest {
    private PlaylistRepository playlistRepository = Mockito.mock(PlaylistRepository.class);

    private PlaylistService playlistService = new PlaylistService(playlistRepository);

    @Test
    public void createPlaylistTest(){
        Playlist playlist = new Playlist();
        playlistService.createPlaylist(playlist);
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
}
