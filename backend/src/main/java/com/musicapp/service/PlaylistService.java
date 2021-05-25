package com.musicapp.service;

import com.musicapp.model.Playlist;
import com.musicapp.model.Song;
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

    /*
    *
    * Create
    *
    * */

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

    /*
    *
    * Read
    *
    * */

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
     * Gets the songs on a specified playlist, null otherwise
     * @param playlistId The id of the playlist to find
     * @return The list of songs on the playlist
     */
    @Override
    public List<Song> readPlaylistSongsByPlaylistId(String playlistId) {
        Playlist foundPlaylist = playlistRepository.findById(playlistId).orElse(null);
        if (foundPlaylist == null){
            return null;
        }
        return foundPlaylist.getSongs();
    }

    /*
    *
    * Update
    *
    * */

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

    /**
     * Adds a song to the listed playlist
     * @param playlistId The playlist to add the song to
     * @param song The song to be added
     * @return The updated playlist
     */
    public Playlist updatePlaylistSongs(String playlistId, Song song) {
        Playlist foundPlaylist = playlistRepository.findById(playlistId).orElse(null);
        //make sure the playlist exists
        if (foundPlaylist == null) {
            return null;
        }
        List<Song> songs = foundPlaylist.getSongs();
        //make sure it's not inside of the playlist already
        if (songs.contains(song)){
            return null;
        }
        songs.add(song);
        foundPlaylist.setSongs(songs);
        playlistRepository.save(foundPlaylist);
        return foundPlaylist;
    }

    /*
    *
    * Delete
    *
    * */

    /**
     * Deletes a playlist from the repository
     * @param playlist The playlist to delete
     */
    @Override
    public void deletePlaylist(Playlist playlist) {
        playlistRepository.delete(playlist);
    }

    /**
     * Deletes a song from a playlist
     * @param playlistId The playlist to delete from
     * @param songId The song id to delete
     * @return The updated playlist, null if playlistId or songId do not exist in the repo/playlist
     */
    @Override
    public Playlist deletePlaylistSong(String playlistId, String songId) {
        Playlist foundPlaylist = playlistRepository.findById(playlistId).orElse(null);
        // if the playlist doesn't exist
        if (foundPlaylist == null){
            return null;
        }
        List<Song> songs = foundPlaylist.getSongs();
        // make sure it doesn't exist in the song list
        for (Song song : songs){
            if (song.getSongId().equals(songId)){
                //remove it and return
                songs.remove(song);

                playlistRepository.save(foundPlaylist);
                return foundPlaylist;
            }
        }
        return null;
    }
}
