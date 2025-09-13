package com.spring_backend.card.controller.dto;

import com.spring_backend.card.dao.model.CardAccessType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CardUpdateDTO {
    private String name;
    private CardAccessType accessType;
}
