package com.musicapp.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * Pojo for Playlist.
 */
@Data
@Document(collection = "playlists")
public class Playlist {
    String userId;
    String name;
    List<Track> songs;
}
