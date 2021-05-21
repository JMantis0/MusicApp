package com.musicapp.service;

import com.musicapp.model.Playlist;
import com.musicapp.repository.PlaylistRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Service for handling playlist requests
 */
@Service
@AllArgsConstructor
public class PlaylistService implements IPlaylistService{
    private final PlaylistRepository playlistRepository;
    /**
     * Creates a playlist in the playlist of the repository with the given user's id
     * @param playlist The playlist being added
     * @return The playlist returning (TO BE REMOVED)
     */
    public boolean createPlaylist(Playlist playlist) {
        playlistRepository.save(playlist);
        return true;
    }
}
