package com.spring_backend.card.controller;

import com.spring_backend.card.controller.dto.RegisterCardDTO;
import com.spring_backend.card.dao.model.Card;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Slf4j
@RestController
@RequestMapping("/cards")
@RequiredArgsConstructor
public class CardController {

    @PostMapping
    public ResponseEntity<Card> registerCard(
            @RequestBody RegisterCardDTO request
    ) {
        log.info("Received a request to register a card with hex code: {}", request.getHexCode());
        Random random = new Random();
        List<String> testNames = new ArrayList<>(
                List.of("Hubert", "Bartek", "Kuba", "Wiktor", "Rysiu", "Aliaks")
        );
        Card card = new Card(
                request.getHexCode(),
                testNames.get(
                        random.nextInt(0, testNames.size() - 1)
                )
        );
        return ResponseEntity.ok(card);
    }
}
