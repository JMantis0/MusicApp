package com.musicapp.controller;

import com.musicapp.model.Playlist;
import com.musicapp.model.Song;
import com.musicapp.service.PlaylistService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
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
            log.info("Successfully created playlist of playlistId : {}",playlist.getPlaylistId());
            return new ResponseEntity<>(playlist,HttpStatus.OK);
        }
        log.error("Failed to create playlist of playlistId : {}",playlist.getPlaylistId());
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
        log.info("Retrieved playlists for User : {}.",username);
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
            log.error("No songs on playlistId : {}.",playlistId);
            return new ResponseEntity<>(HttpStatus.valueOf(401));
        }
        log.info("Retrieved songs for playlistId : {}",playlistId);
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
            log.info("Successfully updated playlistId : {}",playlist.getPlaylistId());
            return new ResponseEntity<>(updatedPlaylist,HttpStatus.OK);
        }
        log.error("Cannot update playlistId : {} as it does not exist",playlist.getPlaylistId());
        return new ResponseEntity<>(HttpStatus.valueOf(401));
    }

    /**
     * Updates a playlist, given with the ID, with the song listed.
     */
    @PutMapping("/update/playlist/song")
    public ResponseEntity<Playlist> updatePlaylistSongs(@RequestParam String playlistId, @RequestBody Song song){
        Playlist updatedPlaylist = playlistService.updatePlaylistSongs(playlistId,song);
        if (updatedPlaylist != null){
            log.info("Successfully updated playlistId : {} with songId : {}.",playlistId,song.getSongId());
            return new ResponseEntity<>(updatedPlaylist,HttpStatus.OK);
        }
        log.error("Failed to update playlistId : {} with songId : {}",playlistId,song.getSongId());
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
     * @param playlistId The playlist to delete
     * @return The status of the delete
     */
    @DeleteMapping("/delete/playlist")
    public ResponseEntity<List<Playlist>> deletePlaylist(@RequestParam String playlistId){
        Playlist foundPlaylist = playlistService.readPlaylistById(playlistId);
        if (foundPlaylist == null){
            log.error("Cannot delete playlistId : {}.",playlistId);
            return new ResponseEntity<>(HttpStatus.valueOf(401));
        }
        String user = foundPlaylist.getUsername();
        playlistService.deletePlaylist(playlistId);
        log.info("Deleted playlistId : {}.",playlistId);
        return readPlaylist(user);
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
            log.info("Successfully deleted songId : {} from playlistId : {}.",songId,playlistId);
            return new ResponseEntity<>(updatedPlaylist,HttpStatus.OK);
        }
        log.error("Failed to delete songId : {} from playlistId : {}.",songId,playlistId);
        return new ResponseEntity<>(HttpStatus.valueOf(401));
    }
}