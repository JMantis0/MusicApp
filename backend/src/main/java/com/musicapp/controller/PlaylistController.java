package com.musicapp.controller;

import com.musicapp.model.Playlist;
import com.musicapp.model.Song;
import com.musicapp.service.PlaylistService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for handling playlist requests.
 */
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@AllArgsConstructor
@RequestMapping("/api")
public class PlaylistController {
    private final PlaylistService playlistService;

    /*
    *
    * Create
    *
    * */

    /**
     * Creates an empty playlist
     * @param playlist The new playlist
     * @return The status of the attempt
     */
    @PostMapping("/create/playlist")
    public ResponseEntity<Playlist> createPlaylist(@RequestBody Playlist playlist) {
        if (playlistService.createPlaylist(playlist))
        {
            return new ResponseEntity<>(playlist,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.valueOf(401));
    }

    /*
    *
    * Read
    *
    * */

    /**
     * Gets all playlists of a given user
     * @param username The user to get the playlists of
     * @return The playlists
     */
    @GetMapping("/read/playlist/user")
    public ResponseEntity<List<Playlist>> readPlaylist(@RequestParam String username){
        List<Playlist> playlists = playlistService.readPlaylist(username);
        return new ResponseEntity<>(playlists,HttpStatus.OK);
    }

    /**
     * Gets a list of all songs in a playlist, determined by playlist Id
     * @param playlistId The Id of the playlist to find
     * @return The list of songs in the playlist, 401 status if no playlist found
     */
    @GetMapping("/read/playlist/song")
    public ResponseEntity<List<Song>> readPlaylistSongsByPlaylistId(@RequestParam String playlistId){
        List<Song> songs = playlistService.readPlaylistSongsByPlaylistId(playlistId);
        if (songs == null){
            return new ResponseEntity<>(HttpStatus.valueOf(401));
        }
        return new ResponseEntity<>(songs,HttpStatus.OK);
    }

    /*
    *
    * Update
    *
    * */

    /**
     * The playlist updating
     * @param playlist The playlist containing the updated information
     * @return The playlist and status code
     */
    @PutMapping("/update/playlist")
    public ResponseEntity<Playlist> updatePlaylist(@RequestBody Playlist playlist){
        Playlist updatedPlaylist = playlistService.updatePlaylist(playlist);
        if (updatedPlaylist != null){
            return new ResponseEntity<>(updatedPlaylist,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.valueOf(401));
    }

    /**
     * Updates a playlist, given with the ID, with the song listed.
     */
    @PutMapping("/update/playlist/song")
    public ResponseEntity<Playlist> updatePlaylistSongs(@RequestParam String playlistId, @RequestBody Song song){
        Playlist updatedPlaylist = playlistService.updatePlaylistSongs(playlistId,song);
        if (updatedPlaylist != null){
            return new ResponseEntity<>(updatedPlaylist,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.valueOf(401));
    }

    /**
     * Adds multiple songs to a playlist
     * @param playlistId The id of the playlist to add to
     * @param songs The songs on the playlist to add
     * @return The response entity containing the playlist
     */
    @PutMapping("/update/playlist/songs")
    public ResponseEntity<Playlist> updatePlaylistSongsMultiple(@RequestParam String playlistId, @RequestBody List<Song> songs){
        for (Song song : songs){
            updatePlaylistSongs(playlistId,song);
        }
        Playlist playlist = playlistService.readPlaylistById(playlistId);
        return new ResponseEntity<>(playlist,HttpStatus.OK);
    }

    /*
    *
    * Delete
    *
    * */

    /**
     * Delete a given playlist
     * @param playlist The playlist to delete
     * @return The status of the delete
     */
    @DeleteMapping("/delete/playlist")
    public ResponseEntity<Playlist> deletePlaylist(@RequestParam Playlist playlist){
        playlistService.deletePlaylist(playlist);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Deletes a song from a playlist
     * @param playlistId The id of the playlist to delete from
     * @param songId The id of the song to delete
     * @return The response entity containing the playlist, or a 401 error if the delete failed in some way
     */
    @DeleteMapping("/delete/playlist/song")
    public ResponseEntity<Playlist> deletePlaylistSong(@RequestParam String playlistId, @RequestParam String songId){
        Playlist updatedPlaylist = playlistService.deletePlaylistSong(playlistId,songId);
        if (updatedPlaylist != null){
            return new ResponseEntity<>(updatedPlaylist,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.valueOf(401));
    }
}