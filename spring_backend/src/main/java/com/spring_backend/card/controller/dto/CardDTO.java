package com.spring_backend.card.controller.dto;

import com.spring_backend.card.dao.model.CardAccessType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardDTO {
    private String id;
    private String name;
    private CardAccessType accessType;
    private String cardHolderId;
}
