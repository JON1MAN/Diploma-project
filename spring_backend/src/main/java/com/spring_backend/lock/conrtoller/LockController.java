package com.spring_backend.lock.conrtoller;

import com.spring_backend.lock.conrtoller.dto.LockStatusDTO;
import com.spring_backend.lock.conrtoller.dto.mapper.LockMapper;
import com.spring_backend.lock.dao.model.LockStatus;
import com.spring_backend.lock.service.LockService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/lock")
@RequiredArgsConstructor
public class LockController {
    private final LockService lockService;

    @GetMapping("/status/{id}")
    public ResponseEntity<LockStatusDTO> getLockStatus(@PathVariable String id) {
        log.info("Received a request to get status for lock: {}", id);
        return ResponseEntity.ok(LockMapper.map(lockService.findById(id)));
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<LockStatusDTO> changeLockStatus(
            @PathVariable String id,
            @RequestParam(name = "lock_status") LockStatus lock_status
    ) {
        log.info("Received a request to change ");
        return ResponseEntity.ok(
                LockMapper.map(
                        lockService.changeLockStatus(id, lock_status)
                )
        );
    }
}
