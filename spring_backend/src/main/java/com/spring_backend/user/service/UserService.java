package com.spring_backend.user.service;

import com.spring_backend.card.dao.model.Card;
import com.spring_backend.user.dao.model.User;
import com.spring_backend.user.dao.repository.UserRepository;
import com.spring_backend.user.excpetion.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User findById(String userId) {
        log.info("Fetching user with id: {}", userId);
        return userRepository.findById(UUID.fromString(userId))
                .orElseThrow(() -> {
                    log.error("User doesn't exist with id: {}", userId);
                    return new UserNotFoundException("User doesn't exist with id: " + userId);
                });
    }

    public List<Card> getMyCards(String userId) {
        log.info("Fetching cards for user: {}", userId);
        return findById(userId).getCards();
    }
}
