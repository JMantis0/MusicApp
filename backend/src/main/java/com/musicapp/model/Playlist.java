package com.musicapp.model;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.List;

@Data
@Component("playlist")
public class Playlist {
    List<Track> tracks;
}