package com.musicapp.repository;

import com.musicapp.model.Playlist;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Playlist repository
 */
@Repository
public interface PlaylistRepository extends MongoRepository<Playlist,String> {
    List<Playlist> findByUsername(String username);
    Playlist findByUsernameAndPlaylistName(String username, String playlistName);
}
