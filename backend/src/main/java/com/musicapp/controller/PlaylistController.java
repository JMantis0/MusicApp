package com.musicapp.controller;

import com.musicapp.model.Playlist;
import com.musicapp.model.Track;
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

    @PutMapping("/create_playlist")
    public ResponseEntity<Playlist> createPlaylist(@RequestBody Playlist playlist) {
        boolean test = playlistService.createPlaylist(playlist);
        return new ResponseEntity<Playlist>(playlist,HttpStatus.OK);
    }
}
