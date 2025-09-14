package com.spring_backend.lock.dao.repository.specification;

import com.spring_backend.lock.dao.model.LockEntry;
import org.springframework.data.jpa.domain.Specification;

import java.time.*;

public class LockEntrySpecification {
    public static Specification<LockEntry> findByCardName(String cardName) {
        return ((root, query, criteriaBuilder) ->
                criteriaBuilder.like(root.get("cardName"), cardName));
    }

    public static Specification<LockEntry> findByCardHexCode(String cardHexCode) {
        return ((root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("cardHexCode"), cardHexCode));
    }

    public static Specification<LockEntry> findByDate(LocalDate utcDate) {
        ZoneId sys = ZoneId.systemDefault();
        LocalDateTime startLocal = utcDate.atStartOfDay()
                .atOffset(ZoneOffset.UTC).atZoneSameInstant(sys).toLocalDateTime();
        LocalDateTime endLocal = utcDate.plusDays(1).atStartOfDay()
                .atOffset(ZoneOffset.UTC).atZoneSameInstant(sys).toLocalDateTime();

        return (root, query, cb) -> cb.between(root.get("createdAt"), startLocal, endLocal);
    }

    public static Specification<LockEntry> generateLockEntrySearchSpecification(
            LocalDate date,
            String cardName,
            String cardHexCode
    ) {
        Specification<LockEntry> spec = Specification.where(null);
        spec = generateCardNameSpecification(spec, cardName);
        spec = generateCardHexCodeSpecification(spec, cardHexCode);
        spec = generateDateSpecification(spec, date);
        return spec;
    }

    private static Specification<LockEntry> generateCardNameSpecification(
            Specification<LockEntry> spec,
            String cardName
    ) {
        if (cardName != null) {
            spec = spec.and(LockEntrySpecification.findByCardName(cardName));
        }
        return spec;
    }

    private static Specification<LockEntry> generateCardHexCodeSpecification(
            Specification<LockEntry> spec,
            String cardHexCode
    ) {
        if (cardHexCode != null) {
            spec = spec.and(LockEntrySpecification.findByCardHexCode(cardHexCode));
        }
        return spec;
    }

    private static Specification<LockEntry> generateDateSpecification(Specification<LockEntry> spec, LocalDate date) {
        if (date != null) {
            spec = spec.and(LockEntrySpecification.findByDate(date));
        }
        return spec;
    }
}
