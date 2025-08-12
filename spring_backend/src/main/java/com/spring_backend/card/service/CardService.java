package com.spring_backend.card.service;

import com.spring_backend.card.controller.dto.CardAccessResponseDTO;
import com.spring_backend.card.controller.dto.RegisterCardDTO;
import com.spring_backend.card.controller.dto.mapper.CardMapper;
import com.spring_backend.card.dao.model.Card;
import com.spring_backend.card.dao.repository.CardRepository;
import com.spring_backend.card.exception.CardNotFoundException;
import com.spring_backend.card.exception.CardWithHexCodeExistsException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CardService {

    private final CardRepository cardRepository;

    public Card findByHexCodeAndIsDeletedFalse(String hexCode) {
        return cardRepository.findByHexCodeAndIsDeletedFalse(hexCode)
                .orElseThrow(() -> {
                    log.error("Card not found with hex code: {}", hexCode);
                    return new CardNotFoundException("Card not found with hex code: ");
                });
    }

    public CardAccessResponseDTO validateCardAccess(String hexCode) {
        log.info("Validating access for card with hex code: {}", hexCode);
        Card card = findByHexCodeAndIsDeletedFalse(hexCode);
        return CardAccessResponseDTO.builder()
                .accessType(card.getCardAccessType())
                .build();
    }

    @Transactional
    public Card registerCard(RegisterCardDTO registerDto) {
        log.info("Registering a card with hexcode: {}", registerDto.getHexCode());
        validateIfExistsByHexCode(registerDto.getHexCode());
        Card card = CardMapper.map(registerDto);
        return cardRepository.save(card);
    }

    @Transactional
    public void softDelete(String hexCode) {
        log.info("Soft deleting a card with hex code: {}", hexCode);
        Card deletedCard = findByHexCodeAndIsDeletedFalse(hexCode);
        deletedCard.setDeleted(true);
        cardRepository.save(deletedCard);
    }

    private void validateIfExistsByHexCode(String hexCode) {
        if (existsByHexCode(hexCode)) {
            log.error("Card already exists with provided hex code: {}", hexCode);
            throw new CardWithHexCodeExistsException("Card already exists with provided hex code: " + hexCode);
        }
    }

    public boolean existsByHexCode(String hexCode) {
        return cardRepository.existsByHexCode(hexCode);
    }
}
