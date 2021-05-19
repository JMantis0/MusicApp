package com.musicapp.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.stereotype.Component;


@Data
@Component("track")
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
