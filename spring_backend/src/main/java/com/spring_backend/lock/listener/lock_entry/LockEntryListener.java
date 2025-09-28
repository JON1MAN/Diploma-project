package com.spring_backend.lock.listener.lock_entry;

import com.spring_backend.lock.listener.lock_entry.event.LockEntryEvent;
import com.spring_backend.lock.service.LockEntryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class LockEntryListener {

    private final LockEntryService lockEntryService;

    @EventListener
    public void handleLockEntryEvent(LockEntryEvent event) {
        log.info("Triggered event listener on: {}", event.getClass().getSimpleName());
        lockEntryService.registerLockEntry(event.getCard());
    }
}
