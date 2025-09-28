package com.spring_backend.lock.conrtoller.dto.mapper;

import com.spring_backend.lock.conrtoller.dto.LockStatusDTO;
import com.spring_backend.lock.dao.model.Lock;

public class LockMapper {
    public static LockStatusDTO map(Lock lock) {
        return LockStatusDTO.builder()
                .lockStatus(lock.getStatus())
                .build();
    }
}
