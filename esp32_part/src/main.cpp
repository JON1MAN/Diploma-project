#include <Arduino.h>
#include "RFIDModule.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <Arduino_JSON.h>
#include <HttpRequestUtils.h>
#include <RegisterCardDTO.h>
#include <Keypad.h>

const byte ROWS = 1;
const byte COLS = 4;
char hexaKeys[ROWS][COLS] = {
  {'0','1','2','3'}
};

byte rowPins[ROWS] = {13};
byte colPins[COLS] = {26, 25, 33, 32}; 

Keypad customKeypad = Keypad( makeKeymap(hexaKeys), rowPins, colPins, ROWS, COLS); 

const char* ssid = "";
const char* password = "";
const char* registerCardEndpoint = "http://:8080/cards/register";
const char* validateCardAccessEndpoint = "http://:8080/cards/validate/";
const char* deleteCardEndpoint = "http://:8080/cards/";

RFIDModule rfid(5, 21);

String registerCard(String hexCode) {
  RegisterCardDTO requestBody(hexCode);
  String jsonBody = requestBody.toJson();
  return HttpRequestUtils::post(registerCardEndpoint, jsonBody);
}

String validateCardAccess(String hexCode) {
  String url = String(validateCardAccessEndpoint) + hexCode;
  return HttpRequestUtils::get(url.c_str());
}

String deleteCard(String hexCode) {
  String url = String(deleteCardEndpoint) + hexCode;
  return HttpRequestUtils::del(url.c_str());
}

void setup() {
  Serial.begin(9600);
  WiFi.disconnect(true); 
  delay(1000);
  
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  Serial.print("Signal strength (RSSI): ");
  Serial.println(WiFi.RSSI());

  int retries = 0;
  while (WiFi.status() != WL_CONNECTED && retries < 20) {
    delay(500);
    Serial.print(".");
    retries++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println();
    Serial.print("Connected to WiFi with IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println();
    Serial.println(WiFi.status());
    Serial.println("Failed to connect to WiFi.");
  }
}

void loop() {
  char customKey = customKeypad.getKey();
    if(WiFi.status()== WL_CONNECTED){
      delay(700);
      if (customKey == '0'){
        Serial.println(customKey);
        String registerResponse = registerCard("aaa_hex_code");
        Serial.println(registerResponse);
        JSONVar registerResponseObject = JSON.parse(registerResponse);
        Serial.print("JSON object = ");
        Serial.println(registerResponseObject);
    } else if (customKey == '1') {
        Serial.println(customKey);
        String validateAccessResponse = validateCardAccess("aaa_hex_code");
        Serial.println(validateAccessResponse);
        JSONVar validateResponseObject = JSON.parse(validateAccessResponse);
        Serial.print("JSON object = ");
        Serial.println(validateResponseObject);
    } else if (customKey == '2') {
        Serial.println(customKey);
        String deleteCardResponse = deleteCard("fun_hex_code");
        Serial.println(deleteCardResponse);
        JSONVar deleteCardResponseObject = JSON.parse(deleteCardResponse);
        Serial.print("JSON object = ");
        Serial.println(deleteCardResponseObject);
    }
  } else {
    Serial.println("WiFi Disconnected");
  }
  
}

// void loop() {
//     if (rfid.isCardPresent()) {
//         String uid = rfid.readCardUID();
//         Serial.println("Card UID: " + uid);
        
//         if (uid == "79d270a2") {
//             Serial.println("Access granted!");
//             delay(2000);
//         } else {
//             Serial.println("Access denied.");
//             delay(2000);
//         }
//     }

//     delay(100);
// }