package com.spring_backend.card.controller.dto;

import com.spring_backend.card.dao.model.CardAccessType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CardAccessResponseDTO {
    private CardAccessType accessType;
}
