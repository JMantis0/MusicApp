package com.musicapp.service;

import com.musicapp.model.User;

/**
 * Service interface
 */
public interface IUserService {
    User logIn(User user);

    User findByUsername(String username);

    User updateUser(User user);

}
