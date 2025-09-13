package com.spring_backend.user.controller;

import com.spring_backend.card.controller.dto.CardDTO;
import com.spring_backend.card.controller.dto.mapper.CardMapper;
import com.spring_backend.common.AbstractEntity;
import com.spring_backend.user.controller.dto.UserDetailsDTO;
import com.spring_backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.spring_backend.user.controller.dto.mapper.UserMapper.map;

@Slf4j
@CrossOrigin(value = "http://localhost/3000")
@RestController()
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final String MOCKED_USER_ID = "9850b5e8-8cf9-41e4-9c23-0468e685ba6a";

    @GetMapping()
    public ResponseEntity<UserDetailsDTO> getUserDetails() {
        log.info("Received a request to get details for current authenticated user: {}", MOCKED_USER_ID);
        return ResponseEntity.ok(
                map(userService.findById(MOCKED_USER_ID))
        );
    }

    @GetMapping("/cards")
    public ResponseEntity<List<CardDTO>> getMyCards() {
        log.info("Received a request to get cards for user: {}", MOCKED_USER_ID);
        var userCards = userService.getMyCards(MOCKED_USER_ID);
        return ResponseEntity.ok(
                userCards.stream()
                        .filter(card -> !card.isDeleted())
                        .map(CardMapper::map)
                        .toList()
        );
    }
}
