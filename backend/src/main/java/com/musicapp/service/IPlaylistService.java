package com.musicapp.service;

import com.musicapp.model.Playlist;
import com.musicapp.model.User;

import java.util.List;

/**
 * Playlist service interface
 */
public interface IPlaylistService {
    void createPlaylist(Playlist playlist);
    List<Playlist> readPlaylist(User user);
}
