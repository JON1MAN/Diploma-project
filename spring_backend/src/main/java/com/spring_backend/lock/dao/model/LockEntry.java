package com.spring_backend.lock.dao.model;

import com.spring_backend.card.dao.model.Card;
import com.spring_backend.common.entity.AbstractEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "lock_entries")
@AllArgsConstructor
@NoArgsConstructor
public class LockEntry extends AbstractEntity {
    private String cardHexCode;
    private String cardName;
}
