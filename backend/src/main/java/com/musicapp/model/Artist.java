package com.musicapp.model;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component("artist")
public class Artist {
    String artistId;
    String name;
    /**
     * Link to the picture of the Artist.
     */
    String picture;
}
