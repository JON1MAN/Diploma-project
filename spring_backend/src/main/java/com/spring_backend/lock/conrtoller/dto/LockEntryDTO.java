package com.spring_backend.lock.conrtoller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LockEntryDTO {
    private String id;
    private String cardName;
    private String cardHexCode;
    private Date createdAt;
}
