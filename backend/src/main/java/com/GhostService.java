package com;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class GhostService {

    private List<Ghost> ghosts = new ArrayList<>(Arrays.asList(
            new Ghost("Casper","Friendly"),
            new Ghost("Mark Brown", "Oni"),
            new Ghost("Spooper","Bedsheet")
    ));

    public List<Ghost> getAllGhosts() {return ghosts;}
}
