#include <Arduino.h>
#include "RFIDModule.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <Arduino_JSON.h>
#include <HttpRequestUtils.h>
#include <RegisterCardDTO.h>
#include <CardClient.h>
#include <Keypad.h>

const byte ROWS = 1;
const byte COLS = 4;
char hexaKeys[ROWS][COLS] = {
  {'0','1','2','3'}
};

byte rowPins[ROWS] = {13};
byte colPins[COLS] = {26, 25, 33, 32}; 

Keypad customKeypad = Keypad( makeKeymap(hexaKeys), rowPins, colPins, ROWS, COLS); 
CardClient cardClient;

const char* ssid = WIFI_SSID;
const char* password = WIFI_PASSWORD;

RFIDModule rfid(5, 21);

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
      delay(100);
      if (customKey == '0'){
        Serial.println(customKey);
        cardClient.registerCard("bbb_hex_code");
    } else if (customKey == '1') {
        Serial.println(customKey);
        cardClient.validateCard("bbb_hex_code");
    } else if (customKey == '2') {
        Serial.println(customKey);
        cardClient.deleteCard("bbb_hex_code");
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