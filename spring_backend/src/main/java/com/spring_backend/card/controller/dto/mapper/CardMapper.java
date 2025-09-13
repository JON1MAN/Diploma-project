package com.spring_backend.card.controller.dto.mapper;

import com.spring_backend.card.controller.dto.CardDTO;
import com.spring_backend.card.controller.dto.CardUpdateDTO;
import com.spring_backend.card.controller.dto.RegisterCardDTO;
import com.spring_backend.card.dao.model.Card;
import com.spring_backend.card.dao.model.CardAccessType;

public class CardMapper {

    public static Card map(RegisterCardDTO dto) {
        Card card = new Card();
        card.setHexCode(dto.getHexCode());
        card.setDeleted(false);
        card.setCardAccessType(CardAccessType.PERMIT);
        return card;
    }

    public static CardDTO map(Card dao) {
        return CardDTO.builder()
                .id(dao.getHexCode())
                .name(dao.getName())
                .accessType(dao.getCardAccessType())
                .cardHolderId(dao.getUserId().getId().toString())
                .build();
    }

    public static void map(Card dao, CardUpdateDTO dto) {
        dao.setName(dto.getName());
        dao.setCardAccessType(dto.getAccessType());
    }
}
