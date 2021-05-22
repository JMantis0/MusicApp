package com.musicapp.service;
import com.musicapp.model.Playlist;
import com.musicapp.repository.PlaylistRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

public class PlaylistServiceTest {
    private PlaylistRepository playlistRepository = Mockito.mock(PlaylistRepository.class);

    private PlaylistService playlistService = new PlaylistService(playlistRepository);

    @Test
    public void createPlaylistTest(){
        Playlist playlist = new Playlist();
        playlistService.createPlaylist(playlist);
    }
}
