package com.spring_backend.lock.service;

import com.spring_backend.card.dao.model.Card;
import com.spring_backend.lock.dao.model.LockEntry;
import com.spring_backend.lock.dao.repository.LockEntryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class LockEntryService {
    private final LockEntryRepository lockEntryRepository;

    public LockEntry registerLockEntry(Card card) {
        log.info("Registering card entry for card: {}", card.getId().toString());
        return lockEntryRepository.save(generateLockEntry(card));
    }

    public List<LockEntry> getPaginatedLockEntries(int size, int page) {
        log.info("Fetching paginated lock entries for page: {}", page);
        Pageable sortedByCreateDesc =
                PageRequest.of(page, size, Sort.by("createdAt").descending());
        return lockEntryRepository.findAll();
    }

    private LockEntry generateLockEntry(Card card) {
        log.info("Generating lock entry for card: {}", card.getHexCode());
        LockEntry lockEntry = new LockEntry();
        lockEntry.setCardHexCode(card.getHexCode());
        lockEntry.setCardName(card.getName());
        lockEntry.setDeleted(false);
        return lockEntry;
    }
}
