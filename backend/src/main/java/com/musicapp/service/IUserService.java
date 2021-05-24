package com.musicapp.service;

import com.musicapp.model.User;

/**
 * Service interface
 */
public interface IUserService {
    /*
    User save(User user);

    List<User> findAll();


    void delete(String id);
    */
    User logIn(User user);

    User findByUsername(String username);

    User updateUser(User user);

}
