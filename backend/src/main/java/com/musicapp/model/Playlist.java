package com.musicapp.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "playlists")
public class Playlist {
    List<Track> tracks;
}
