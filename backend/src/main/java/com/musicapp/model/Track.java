package com.musicapp.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;


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
