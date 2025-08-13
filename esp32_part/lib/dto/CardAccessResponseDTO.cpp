#include "CardAccessResponseDTO.h"

CardAccessResponseDTO::CardAccessResponseDTO(String accessType)
    : _accessType(accessType) {
}

CardAccessResponseDTO CardAccessResponseDTO::mapJsonToDTO(JSONVar json) {
    String accessType = (const char*)json["accessType"];
    return CardAccessResponseDTO(accessType);
}
