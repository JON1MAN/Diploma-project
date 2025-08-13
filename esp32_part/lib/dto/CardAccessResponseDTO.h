#ifndef CARD_ACCESS_RESPONSE_DTO_H
#define CARD_ACCESS_RESPONSE_DTO_H
#include <Arduino.h>
#include <Arduino_JSON.h>

class CardAccessResponseDTO {
public:
    String _accessType;
    CardAccessResponseDTO(String accessType);
    static CardAccessResponseDTO mapJsonToDTO(JSONVar json);
    const String& accessType() const { return _accessType; }
};

#endif
