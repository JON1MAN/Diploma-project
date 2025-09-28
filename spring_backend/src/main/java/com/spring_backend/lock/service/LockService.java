package com.spring_backend.lock.service;

import com.spring_backend.lock.dao.model.Lock;
import com.spring_backend.lock.dao.model.LockStatus;
import com.spring_backend.lock.dao.repository.lock.LockRepository;
import com.spring_backend.lock.exception.LockNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class LockService {
    private final LockRepository lockRepository;

    public Lock findById(String lockId) {
        log.info("Fetching lock: {}", lockId);
        Lock lock = new Lock();
        lock.setStatus(LockStatus.OPEN);
        return lock;
        /*return lockRepository.findById(UUID.fromString(lockId))
                .orElseThrow(() -> {
                    log.error("Lock not found with id: {}", lockId);
                    return new LockNotFoundException("Lock not found with id: " + lockId);
                });*/
    }

    @Transactional
    public Lock changeLockStatus(String lockId, LockStatus lockStatus) {
        var lock = findById(lockId);
        log.info("Changing status from: {}, to: {}, for lock: {}",
                lock.getStatus(), lockStatus, lockId);
        lock.setStatus(lockStatus);
        return lockRepository.save(lock);
    }
}
