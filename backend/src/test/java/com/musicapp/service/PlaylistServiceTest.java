package com.musicapp.service;
import com.musicapp.model.Playlist;
import com.musicapp.model.Song;
import com.musicapp.repository.PlaylistRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class PlaylistServiceTest {
    private final PlaylistRepository playlistRepository = Mockito.mock(PlaylistRepository.class);

    private final PlaylistService playlistService = new PlaylistService(playlistRepository);

    /*
    *
    * Creation Tests
    *
    * */
    @Test
    public void createPlaylistSuccessTest(){
        Playlist playlist = new Playlist();

        Mockito.when(playlistRepository.findByUsernameAndPlaylistName(
                playlist.getUsername(),
                playlist.getPlaylistName()
            )).thenReturn(
                playlist);


        boolean result = playlistService.createPlaylist(playlist);

        Assertions.assertFalse(result);
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

        Assertions.assertTrue(result);
    }

    /*
    *
    * Read Tests
    *
    * */
    @Test
    public void readPlaylistTest(){
        Playlist playlist = new Playlist();
        playlist.setPlaylistName("Playlist Name");

        List<Playlist> playlists = new ArrayList<>();
        playlists.add(playlist);

        Mockito.when(playlistRepository.findByUsername("username")).thenReturn(playlists);

        List<Playlist> foundPlaylists = playlistService.readPlaylist("username");
        Assertions.assertEquals("Playlist Name", foundPlaylists.get(0).getPlaylistName());
    }

    @Test
    public void readPlaylistSongsByPlaylistIdSuccessTest(){
        String playlistId = "good id";
        Playlist playlist = new Playlist();
        List<Song> songs = new ArrayList<>();

        playlist.setSongs(songs);

        Mockito.when(playlistRepository.findById(playlistId)).thenReturn(java.util.Optional.of(playlist));

        List<Song> foundSongs = playlistService.readPlaylistSongsByPlaylistId(playlistId);
        Assertions.assertEquals(songs,foundSongs);
    }

    @Test
    public void readPlaylistSongsByPlaylistIdFailureTest(){
        String playlistId = "badId";

        Mockito.when(playlistRepository.findById(playlistId)).thenReturn(Optional.empty());
        List<Song> foundSongs = playlistService.readPlaylistSongsByPlaylistId(playlistId);
        Assertions.assertNull(foundSongs);
    }

    @Test
    public void readPlaylistByIdTest(){
        String playlistId = "goodId";
        Playlist playlist = new Playlist();

        Mockito.when(playlistRepository.findById(playlistId)).thenReturn(Optional.of(playlist));

        Playlist foundPlaylist = playlistService.readPlaylistById(playlistId);

        Assertions.assertEquals(playlist,foundPlaylist);
    }

    /*
    *
    * Update Tests
    *
    * */
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

        Assertions.assertEquals(playlist, foundPlaylist);

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

        Assertions.assertNull(foundPlaylist);
    }

    @Test
    public void updatePlaylistSongSuccessTest(){
        String playlistId = "goodId";

        Song song1 = new Song();
        Song song2 = new Song();
        song1.setSongId("s1");
        song2.setSongId("s2");

        List<Song> songs = new ArrayList<>();
        songs.add(song1);

        Playlist playlist = new Playlist();
        playlist.setSongs(songs);

        Mockito.when(playlistRepository.findById(playlistId)).thenReturn(Optional.of(playlist));

        Playlist updatedPlaylist = playlistService.updatePlaylistSongs(playlistId,song2);

        Assertions.assertEquals(updatedPlaylist.getSongs().size(),2);
    }

    @Test
    public void updatePlaylistSongFailureDoesNotExist(){
        String playlistId = "badId";
        Song song = new Song();

        Mockito.when(playlistRepository.findById(playlistId)).thenReturn(Optional.empty());

        Playlist updatePlaylist = playlistService.updatePlaylistSongs(playlistId,song);

        Assertions.assertNull(updatePlaylist);
    }

    @Test
    public void updatePlaylistSongFailureAlreadyExists(){
        String playlistId = "goodId";

        Song song = new Song();

        List<Song> songs = new ArrayList<>();
        songs.add(song);

        Playlist playlist = new Playlist();
        playlist.setSongs(songs);

        Mockito.when(playlistRepository.findById(playlistId)).thenReturn(Optional.of(playlist));

        Playlist updatedPlaylist = playlistService.updatePlaylistSongs(playlistId,song);

        Assertions.assertNull(updatedPlaylist);
    }
    /*
    *
    * Delete Tests
    *
    * */
    @Test
    public void deletePlaylistTest(){
        Playlist playlist = new Playlist();

        playlistService.deletePlaylist(playlist);
    }

    @Test
    public void deletePlaylistSongSuccessTest(){
        String playlistId = "goodId";
        String songId = "goodId";

        Song song = new Song();
        song.setSongId(songId);

        List<Song> songs = new ArrayList<>();
        songs.add(song);

        Playlist playlist = new Playlist();
        playlist.setSongs(songs);

        Mockito.when(playlistRepository.findById(playlistId)).thenReturn(Optional.of(playlist));

        Playlist foundPlaylist = playlistService.deletePlaylistSong(playlistId,songId);

        Assertions.assertEquals(foundPlaylist.getSongs().size(),0);
    }

    @Test
    public void deletePlaylistSongNoSuchPlaylist(){
        String playlistId = "badId";
        String songId = "doesNotMatter";

        Mockito.when(playlistRepository.findById(playlistId)).thenReturn(Optional.empty());

        Playlist foundPlaylist = playlistService.deletePlaylistSong(playlistId,songId);

        Assertions.assertNull(foundPlaylist);
    }

    @Test
    public void deletePlaylistSongNoSuchSong(){
        String playlistId = "goodId";
        String songIdBad = "badId";
        String songIdGood = "goodId";

        Song song = new Song();
        song.setSongId(songIdBad);

        List<Song> songs = new ArrayList<>();
        songs.add(song);

        Playlist playlist = new Playlist();
        playlist.setSongs(songs);

        Mockito.when(playlistRepository.findById(playlistId)).thenReturn(Optional.of(playlist));

        Playlist foundPlaylist = playlistService.deletePlaylistSong(playlistId,songIdGood);

        Assertions.assertNull(foundPlaylist);
    }
}
