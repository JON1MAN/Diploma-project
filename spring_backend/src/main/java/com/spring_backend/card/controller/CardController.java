package com.spring_backend.card.controller;

import com.spring_backend.card.controller.dto.CardAccessResponseDTO;
import com.spring_backend.card.controller.dto.RegisterCardDTO;
import com.spring_backend.card.dao.model.Card;
import com.spring_backend.card.service.CardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Slf4j
@RestController
@RequestMapping("/cards")
@RequiredArgsConstructor
public class CardController {

    private final CardService cardService;

    @GetMapping(value = "/validate/{hexCode}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CardAccessResponseDTO> validateAccess(
            @PathVariable(name = "hexCode") String hexCode
    ) {
        log.info("Received a request to validate access for a card with hex code: {}", hexCode);
        return ResponseEntity.ok(cardService.validateCardAccess(hexCode));
    }

    @PostMapping("/register")
    public ResponseEntity<Card> registerCard(
            @RequestBody RegisterCardDTO request
    ) {
        log.info("Received a request to register a card with hex code: {}", request.getHexCode());
        return ResponseEntity.ok(cardService.registerCard(request));
    }

    @DeleteMapping("/{hexCode}")
    public ResponseEntity<String> registerCard(
            @PathVariable(name = "hexCode") String hexCode
    ) {
        log.info("Received a request to delete a card with hex code: {}", hexCode);
        cardService.softDelete(hexCode);
        return ResponseEntity.ok("deleted");
    }
}
