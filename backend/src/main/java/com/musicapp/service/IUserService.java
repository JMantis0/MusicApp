package com.musicapp.service;

import com.musicapp.model.User;

import java.util.List;

public interface IUserService {

    User save(User user);

    List<User> findAll();

    User update(User user);

    void delete(String id);
}
