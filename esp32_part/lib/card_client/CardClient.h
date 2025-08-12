#ifndef CARD_CLIENT_H
#define CARD_CLIENT_H

#include <Arduino.h>
#include <Arduino_JSON.h>


class CardClient {
public:
    JSONVar registerCard(const String& hexCode);
    JSONVar validateCard(const String& hexCode);
    String  deleteCard(const String& hexCode);

private:
    const char* _registerCardEndpoint       = REGISTER_ENDPOINT;
    const char* _validateCardAccessEndpoint = VALIDATE_ENDPOINT;
    const char* _deleteCardEndpoint         = DELETE_CARD_ENDPOINT;
};

#endif
