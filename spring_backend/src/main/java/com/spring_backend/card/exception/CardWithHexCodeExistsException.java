package com.spring_backend.card.exception;

public class CardWithHexCodeExistsException extends RuntimeException {
    public CardWithHexCodeExistsException(String message) {
        super(message);
    }
}
