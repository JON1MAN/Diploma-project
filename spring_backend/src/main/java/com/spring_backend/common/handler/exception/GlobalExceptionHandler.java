package com.spring_backend.common.handler.exception;

import com.spring_backend.card.exception.CardNotFoundException;
import com.spring_backend.card.exception.CardWithHexCodeExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CardNotFoundException.class)
    public ResponseEntity<ExceptionResponseDTO> handleCardNotFoundException(
            CardNotFoundException ex
    ) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(createResponse(HttpStatus.NOT_FOUND, ex));
    }

    @ExceptionHandler(CardWithHexCodeExistsException.class)
    public ResponseEntity<ExceptionResponseDTO> handleCardWithHexCodeExistsException(
            CardWithHexCodeExistsException ex
    ) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(createResponse(HttpStatus.CONFLICT, ex));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponseDTO> handleException(
            Exception ex
    ) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex));
    }

    private ExceptionResponseDTO createResponse(HttpStatus status, Exception exception) {
        return ExceptionResponseDTO.builder()
                .status(status.value())
                .error(status.getReasonPhrase())
                .message(exception.getMessage())
                .build();
    }

}
