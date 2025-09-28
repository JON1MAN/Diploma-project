package com.spring_backend.lock.exception;

public class LockNotFoundException extends RuntimeException {
    public LockNotFoundException(String message) {
        super(message);
    }
}
