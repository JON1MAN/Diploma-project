package com.spring_backend.lock.dao.repository.lock;

import com.spring_backend.lock.dao.model.Lock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface LockRepository extends JpaRepository<Lock, UUID> {
}
