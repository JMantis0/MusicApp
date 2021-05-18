package com;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("ghost")
public class GhostController {

    private GhostService ghostService;

    @Autowired
    public GhostController(GhostService ghostService) { this.ghostService = ghostService;}

    @GetMapping(produces= {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity getAllGhosts(){
        List<Ghost> ghosts = ghostService.getAllGhosts();
        List<String> names = null;

        names = ghosts.stream()
                .map(Ghost::getName)
                .collect(Collectors.toList());

        return new ResponseEntity(names, HttpStatus.OK);
    }
}