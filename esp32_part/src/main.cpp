#include <Arduino.h>
#include "RFIDModule.h"

RFIDModule rfid(5, 21);

void setup() {
    Serial.begin(9600);
    rfid.begin();
}

void loop() {
    if (rfid.isCardPresent()) {
        String uid = rfid.readCardUID();
        Serial.println("Card UID: " + uid);
        
        if (uid == "79d270a2") {
            Serial.println("Access granted!");
            delay(2000);
        } else {
            Serial.println("Access denied.");
            delay(2000);
        }
    }

    delay(100);
}
