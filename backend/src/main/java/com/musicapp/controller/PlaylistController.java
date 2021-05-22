package com.musicapp.controller;

import com.musicapp.model.Playlist;
import com.musicapp.model.User;
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

    /**
     * Creates an empty playlist
     * @param playlist The new playlist
     * @return The status of the attempt
     */
    @PostMapping("/create_playlist")
    public ResponseEntity<Playlist> createPlaylist(@RequestBody Playlist playlist) {
        playlistService.createPlaylist(playlist);
        return new ResponseEntity<>(playlist,HttpStatus.OK);
    }

    /**
     * Gets all playlists of a given user
     * @param username The user to get the playlists of
     * @return The playlists
     */
    @GetMapping("/read_playlist")
    public ResponseEntity<List<Playlist>> readPlaylist(@RequestParam String username){
        List<Playlist> playlists = playlistService.readPlaylist(username);
        return new ResponseEntity<>(playlists,HttpStatus.OK);
    }

    /**
     * The playlist updating
     * @param playlist The playlist containing the updated information
     * @return The playlist and status code
     */
    @PutMapping("/update_playlist_songs")
    public ResponseEntity<Playlist> updatePlaylist(@RequestBody Playlist playlist){
        Playlist updatedPlaylist = playlistService.updatePlaylist(playlist);
        if (updatedPlaylist != null){
            return new ResponseEntity<>(updatedPlaylist,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.valueOf(401));
    }
}
