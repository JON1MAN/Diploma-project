package com.spring_backend.card.dao.model;

import com.spring_backend.common.AbstractEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cards")
public class Card extends AbstractEntity {

    @Column(name = "hex_code", unique = true)
    private String hexCode;
    private CardAccessType cardAccessType;
}
