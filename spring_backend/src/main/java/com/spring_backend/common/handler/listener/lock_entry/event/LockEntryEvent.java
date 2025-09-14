package com.spring_backend.common.handler.listener.lock_entry.event;

import com.spring_backend.card.dao.model.Card;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode
public class LockEntryEvent {
    private Card card;
}
