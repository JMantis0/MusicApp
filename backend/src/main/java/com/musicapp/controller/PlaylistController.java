package com.musicapp.controller;

import com.musicapp.model.Playlist;
import com.musicapp.model.User;
import com.musicapp.service.PlaylistService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@AllArgsConstructor
@RequestMapping("/api")
public class PlaylistController {
    private final PlaylistService playlistService;

    @PostMapping("/create_playlist")
    public ResponseEntity<Playlist> createPlaylist(@RequestBody Playlist playlist) {
        playlistService.createPlaylist(playlist);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/read_playlist")
    public ResponseEntity<List<Playlist>> readPlaylist(@RequestBody User user){
        List<Playlist> playlists = playlistService.readPlaylist(user);
        return new ResponseEntity<>(playlists,HttpStatus.OK);
    }
}
