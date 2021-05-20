package com.musicapp.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Document(collection = "tracks")
public class Track {
    String trackId;
    String title;
    /**
     * Link to the MP3 preview of the track.
     */
    String preview;
    Artist artist;
    Album album;
}
