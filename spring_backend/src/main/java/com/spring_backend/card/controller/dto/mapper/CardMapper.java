package com.spring_backend.card.controller.dto.mapper;

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
}
