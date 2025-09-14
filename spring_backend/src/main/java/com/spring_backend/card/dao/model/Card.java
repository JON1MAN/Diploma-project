package com.spring_backend.card.dao.model;

import com.spring_backend.common.entity.model.AbstractEntity;
import com.spring_backend.user.dao.model.User;
import jakarta.persistence.*;
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

    @Column(name = "name", unique = true)
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User userId;
}
