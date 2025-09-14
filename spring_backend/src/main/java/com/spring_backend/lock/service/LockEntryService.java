package com.spring_backend.lock.service;

import com.spring_backend.card.dao.model.Card;
import com.spring_backend.lock.dao.model.LockEntry;
import com.spring_backend.lock.dao.repository.LockEntryRepository;
import com.spring_backend.lock.dao.repository.specification.LockEntrySpecification;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Date;
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

    public List<LockEntry> getPaginatedLockEntries() {
        log.info("Fetching all lock entries sorted by createdAt");
        return lockEntryRepository.findAll(Sort.by("createdAt").descending());
    }

    private LockEntry generateLockEntry(Card card) {
        log.info("Generating lock entry for card: {}", card.getHexCode());
        LockEntry lockEntry = new LockEntry();
        lockEntry.setCardHexCode(card.getHexCode());
        lockEntry.setCardName(card.getName());
        lockEntry.setDeleted(false);
        return lockEntry;
    }

    public List<LockEntry> findAllFilteredByParameters(LocalDate date, String cardName, String cardHexCode) {
        log.info("Searching for lock entries by following parameters");
        Specification<LockEntry> spec =
                LockEntrySpecification.generateLockEntrySearchSpecification(
                        date, cardName, cardHexCode
                );
        return lockEntryRepository.findAll(spec);
    }


}
