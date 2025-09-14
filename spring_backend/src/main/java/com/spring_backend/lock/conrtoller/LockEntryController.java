package com.spring_backend.lock.conrtoller;

import com.spring_backend.lock.conrtoller.dto.LockEntryDTO;
import com.spring_backend.lock.conrtoller.dto.mapper.LockEntryMapper;
import com.spring_backend.lock.dao.model.LockEntry;
import com.spring_backend.lock.service.LockEntryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.util.Date;
import java.util.List;
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
        var lockEntries = lockEntryService.getPaginatedLockEntries().stream()
                .map(LockEntryMapper::map)
                .toList();
        return ResponseEntity.ok(
                new PageImpl<>(lockEntries, PageRequest.of(page, size), lockEntries.size())
        );
    }

    @GetMapping("/search")
    public ResponseEntity<Page<LockEntryDTO>> searchForPaginatedLockEntries(
            @RequestParam(name = "size", defaultValue = "20") Integer size,
            @RequestParam(name = "page", defaultValue = "0") Integer page,
            @RequestParam(name = "date", required = false) String dateStr,
            @RequestParam(name = "card_name", required = false) String card_name,
            @RequestParam(name = "card_hex_code", required = false) String card_hex_code
    ) {
        LocalDate date = null;
        if (dateStr != null && !dateStr.isBlank()) {
            date = LocalDate.parse(dateStr, FLEX_DATE);
        }

        var lockEntries = lockEntryService.findAllFilteredByParameters(date, card_name, card_hex_code)
                .stream()
                .map(LockEntryMapper::map)
                .toList();
        return ResponseEntity.ok(
                new PageImpl<>(lockEntries, PageRequest.of(page, size), lockEntries.size())
        );
    }

    private static final DateTimeFormatter FLEX_DATE = new DateTimeFormatterBuilder()
            .appendOptional(DateTimeFormatter.ISO_LOCAL_DATE)
            .appendOptional(DateTimeFormatter.ofPattern("MM-dd-uuuu"))
            .toFormatter();
}
