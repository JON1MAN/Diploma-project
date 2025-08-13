#include <Arduino.h>
#include "RFIDModule.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <Arduino_JSON.h>
#include <HttpRequestUtils.h>
#include <RegisterCardDTO.h>
#include <CardClient.h>
#include <Keypad.h>
#include <CardAccessResponseDTO.h>

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
  rfid.begin();

  //TODO create setup function in separate WiFi module class or WiFi setup class
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
        delay(200);
        Serial.println(customKey);
        String cardUID = rfid.processCard();
        JSONVar jsonResponse = cardClient.registerCard(cardUID);
    } else if (customKey == '1') {
        Serial.println(customKey);
        String cardUID = rfid.processCard();
        JSONVar jsonResponse = cardClient.validateCard(cardUID);
        CardAccessResponseDTO responseDTO = CardAccessResponseDTO::mapJsonToDTO(jsonResponse);
        Serial.println("Access type: ");
        Serial.println(responseDTO.accessType());
    } else if (customKey == '2') {
        Serial.println(customKey);
        String cardUID = rfid.processCard();
        cardClient.deleteCard(cardUID);
    }
  } else {
    Serial.println("WiFi Disconnected");
  }
}
