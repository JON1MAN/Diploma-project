package com.spring_backend.lock.conrtoller.dto.mapper;

import com.spring_backend.lock.conrtoller.dto.LockEntryDTO;
import com.spring_backend.lock.dao.model.LockEntry;

public class LockEntryMapper {
    public static LockEntryDTO map(LockEntry dao) {
        return LockEntryDTO.builder()
                .id(dao.getId().toString())
                .cardHexCode(dao.getCardHexCode())
                .cardName(dao.getCardName())
                .createdAt(dao.getCreatedAt())
                .build();
    }
}
