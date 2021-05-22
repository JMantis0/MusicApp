package com.musicapp.service;

import com.musicapp.model.Playlist;
import com.musicapp.model.User;

import java.util.List;

/**
 * Playlist service interface
 */
public interface IPlaylistService {
    boolean createPlaylist(Playlist playlist);
    List<Playlist> readPlaylist(String username);
    Playlist updatePlaylist(Playlist playlist);
}
