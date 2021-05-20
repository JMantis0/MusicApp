package com.musicapp.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "artists")
public class Artist {
    String artistId;
    String name;
    /**
     * Link to the picture of the Artist.
     */
    String picture;
}
