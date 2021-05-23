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
    public boolean createPlaylist(Playlist playlist) {
        Playlist foundPlaylist = playlistRepository.findByUsernameAndPlaylistName(playlist.getUsername(), playlist.getPlaylistName());
        if (foundPlaylist == null){
            playlistRepository.save(playlist);
            return true;
        }
        return false;
    }

    /**
     * Returns all playlists of a specified user
     * @param username The user to find the playlists of
     * @return The list of playlists of the specified user
     */
    @Override
    public List<Playlist> readPlaylist(String username) {
        return playlistRepository.findByUsername(username);
    }

    /**
     * Updates a playlist with new information, mostly overwriting the previous
     * @param playlist The playlist to update, containing updated information
     * @return The playlist to return
     */
    @Override
    public Playlist updatePlaylist(Playlist playlist) {
        Playlist foundPlaylist = playlistRepository.findByUsernameAndPlaylistName(playlist.getUsername(),playlist.getPlaylistName());
        if (foundPlaylist != null){
            playlistRepository.delete(foundPlaylist);
            playlistRepository.save(playlist);
        }
        return foundPlaylist;
    }

    @Override
    public void deletePlaylist(Playlist playlist) {
        playlistRepository.delete(playlist);
    }
}
