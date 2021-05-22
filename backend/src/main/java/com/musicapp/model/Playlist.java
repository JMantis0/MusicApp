package com.musicapp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * Pojo for Playlist.
 */
@Data
@Document(collection = "playlists")
public class Playlist {
    @Id
    String playlistId;
    String username;
    String playlistName;
    List<Song> songs;
}
