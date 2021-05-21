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
    private PlaylistService playlistService;

   // @PostMapping("/attempt_login")
   // public ResponseEntity<Playlist> createPlaylist(@RequestBody Playlist playlist) {
   // }
}
