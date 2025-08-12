#include "CardClient.h"
#include "HttpRequestUtils.h"
#include <Arduino.h>
#include <RegisterCardDTO.h>

JSONVar CardClient::registerCard(const String& hexCode) {
    Serial.println("Setup to register a card with hex code: " + hexCode);

    RegisterCardDTO requestBody(hexCode);
    String jsonBody = requestBody.toJson();

    String response = HttpRequestUtils::post(_registerCardEndpoint, jsonBody);
    Serial.println("Received a response for registration request of card with hex: " + hexCode);
    Serial.println(response);

    return JSON.parse(response);
}

JSONVar CardClient::validateCard(const String& hexCode) {
    Serial.println("Setup to validate a card with hex code: " + hexCode);

    String url = String(_validateCardAccessEndpoint) + hexCode; // ensure endpoint ends with '/'
    String response = HttpRequestUtils::get(url.c_str());

    Serial.println("Received a response for validation request of card with hex: " + hexCode);
    Serial.println(response);

    return JSON.parse(response);
}

String CardClient::deleteCard(const String& hexCode) {
    Serial.println("Setup to delete a card with hex code: " + hexCode);

    String url = String(_deleteCardEndpoint) + hexCode; // ensure trailing '/'
    String response = HttpRequestUtils::del(url.c_str());

    Serial.println("Received a response for deletion request of card with hex: " + hexCode);
    Serial.println(response);

    return response;
}
