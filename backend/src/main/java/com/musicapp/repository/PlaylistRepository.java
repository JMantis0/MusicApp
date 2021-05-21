package com.musicapp.repository;

import com.musicapp.model.Playlist;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Playlist repository
 */
@Repository
public interface PlaylistRepository extends MongoRepository<Playlist,String> {
}
