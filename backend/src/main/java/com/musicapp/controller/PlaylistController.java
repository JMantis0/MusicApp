package com.musicapp.controller;

import com.musicapp.model.Playlist;
import com.musicapp.service.PlaylistService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@AllArgsConstructor
@RequestMapping("/api")
public class PlaylistController {
    private final PlaylistService playlistService;

    @PostMapping("/create_playlist")
    public ResponseEntity<Playlist> createPlaylist(@RequestBody Playlist playlist) {
        playlistService.createPlaylist(playlist);
        System.out.println("Is the entity being created?");
        System.out.println("Playlist is " + playlist);
        return new ResponseEntity<Playlist>(HttpStatus.OK);
    }
}
