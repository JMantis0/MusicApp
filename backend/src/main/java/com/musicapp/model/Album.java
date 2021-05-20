package com.musicapp.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "albums")
public class Album {
    String albumId;
    String title;

    /**
     * Link to the picture of the album cover.
     */
    String cover;
}
