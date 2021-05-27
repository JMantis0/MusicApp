package com.musicapp.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;


/**
 * Pojo for track
 */
@Data
@Document(collection = "tracks")
public class Song {
    String songId;
    String title;
    /**
     * Link to the MP3 preview of the track.
     */
    String preview;
    Artist artist;
    Album album;
}
