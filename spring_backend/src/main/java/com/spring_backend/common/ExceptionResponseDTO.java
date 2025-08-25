package com.spring_backend.common;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ExceptionResponseDTO {
    private Integer status;
    private String error;
    private String message;
    private String errorCode;
}
