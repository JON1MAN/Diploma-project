#include "RegisterCardDTO.h"

RegisterCardDTO::RegisterCardDTO(const String& hex) : hexCode(hex) {}

String RegisterCardDTO::toJson() const {
    JSONVar json;
    json["hexCode"] = hexCode;
    return JSON.stringify(json);
}
