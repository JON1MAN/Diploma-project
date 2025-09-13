package com.spring_backend.user.controller.dto.mapper;

import com.spring_backend.user.controller.dto.UserDetailsDTO;
import com.spring_backend.user.dao.model.User;

public class UserMapper {
    public static UserDetailsDTO map(User dao) {
        return UserDetailsDTO.builder()
                .firstName(dao.getFirstName())
                .lastName(dao.getLastName())
                .email(dao.getEmail())
                .build();
    }
}
