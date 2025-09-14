package com.spring_backend.common.entity.repository.specification;

import jakarta.annotation.Nullable;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

import java.io.Serializable;
import java.util.function.Predicate;

public interface Specification<T> extends Serializable {

    @Nullable
    Predicate toPredicated(
            Root<T> root,
            @Nullable CriteriaQuery<?> query,
            CriteriaBuilder criteriaBuilder
    );
}
