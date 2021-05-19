package com.musicapp.model;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component("album")
public class Album {
    String albumId;
    String title;

    /**
     * Link to the picture of the album cover.
     */
    String cover;
}
