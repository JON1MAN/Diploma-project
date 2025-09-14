package com.spring_backend.lock.dao.repository;

import com.spring_backend.lock.dao.model.LockEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface LockEntryRepository extends JpaRepository<LockEntry, UUID>, JpaSpecificationExecutor<LockEntry> {
}
