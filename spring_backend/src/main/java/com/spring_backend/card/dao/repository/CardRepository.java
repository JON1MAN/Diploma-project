package com.spring_backend.card.dao.repository;

import com.spring_backend.card.dao.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CardRepository extends JpaRepository<Card, UUID> {
    Optional<Card> findByHexCodeAndIsDeletedFalse(String hexCode);
    boolean existsByHexCode(String hexCode);
}
