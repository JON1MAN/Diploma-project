package com.spring_backend.lock.conrtoller.dto;

import com.spring_backend.lock.dao.model.LockStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LockStatusDTO {
    private LockStatus lockStatus;
}
