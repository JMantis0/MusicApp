package com.musicapp.service;

import com.musicapp.model.Playlist;
import com.musicapp.model.Song;

import java.util.List;

/**
 * Playlist service interface
 */
public interface IPlaylistService {
    boolean createPlaylist(Playlist playlist);
    List<Playlist> readPlaylist(String username);
    Playlist updatePlaylist(Playlist playlist);
    void deletePlaylist(String playlistId);
    List<Song> readPlaylistSongsByPlaylistId(String playlistId);
    Playlist deletePlaylistSong(String playlistId, String SongId);
    Playlist readPlaylistById(String playlistId);
}
