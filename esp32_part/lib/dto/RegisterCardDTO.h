#ifndef REGISTER_CARD_DTO_H
#define REGISTER_CARD_DTO_H

#include <Arduino_JSON.h>

class RegisterCardDTO {
public:
    String hexCode;

    RegisterCardDTO(const String& hex);
    String toJson() const;
};

#endif
