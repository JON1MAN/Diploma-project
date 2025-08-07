#include <Arduino.h>
#include "RFIDModule.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <Arduino_JSON.h>

const char* ssid = "";
const char* password = "";
const char* serverName = "http://192.168.1.78:8080/ping";

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
    if(WiFi.status()== WL_CONNECTED){
              
      String ping = get(serverName);
      Serial.println(ping);
      JSONVar myObject = JSON.parse(ping);
  
      if (JSON.typeof(myObject) == "undefined") {
        Serial.println("Parsing input failed!");
        return;
      }
    
      Serial.print("JSON object = ");
      Serial.println(myObject);
    }
    else {
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