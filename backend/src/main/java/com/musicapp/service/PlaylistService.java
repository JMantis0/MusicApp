package com.musicapp.service;

import com.musicapp.model.Playlist;
import com.musicapp.model.User;
import com.musicapp.repository.PlaylistRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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
    @Override
    public void createPlaylist(Playlist playlist) {
        playlistRepository.save(playlist);
    }

    /**
     * Returns all playlists of a specified user
     * @param user The user to find the playlists of
     * @return The list of playlists of the specified user
     */
    @Override
    public List<Playlist> readPlaylist(User user) {
        return playlistRepository.findByUsername(user.getUsername());
    }

    /**
     * Updates a playlist with new information, mostly overwriting the previous
     * @param playlist The playlist to update, containing updated information
     * @return The playlist to return
     */
    public Playlist updatePlaylist(Playlist playlist) {
        Playlist foundPlaylist = playlistRepository.findByUsernameAndPlaylistName(playlist.getUsername(),playlist.getPlaylistName());
        if (foundPlaylist != null){
            playlistRepository.save(foundPlaylist);
        }
        return foundPlaylist;
    }
}
