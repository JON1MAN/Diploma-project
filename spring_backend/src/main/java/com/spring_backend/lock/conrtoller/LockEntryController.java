package com.spring_backend.lock.conrtoller;

import com.spring_backend.lock.conrtoller.dto.LockEntryDTO;
import com.spring_backend.lock.conrtoller.dto.mapper.LockEntryMapper;
import com.spring_backend.lock.service.LockEntryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/lock_entries")
@RequiredArgsConstructor
public class LockEntryController {
    private final LockEntryService lockEntryService;

    @GetMapping
    public ResponseEntity<Page<LockEntryDTO>> getPaginatedLockEntriesHistory(
            @RequestParam(name = "size", defaultValue = "20") Integer size,
            @RequestParam(name = "page", defaultValue = "0") Integer page
    ) {
        log.info("Received a request to get lock entries for page: {}", page);
        var lockEntries = lockEntryService.getPaginatedLockEntries(size, page).stream()
                .map(LockEntryMapper::map)
                .toList();
        return ResponseEntity.ok(
                new PageImpl<>(lockEntries, PageRequest.of(page, size), lockEntries.size())
        );
    }
}
