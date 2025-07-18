#include "RFIDModule.h"
#include <SPI.h>

RFIDModule::RFIDModule(uint8_t ssPin, uint8_t rstPin) : mfrc522(ssPin, rstPin) {}

void RFIDModule::begin() {
    SPI.begin();
    mfrc522.PCD_Init();
}

bool RFIDModule::isCardPresent() {
    return mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial();
}

String RFIDModule::readCardUID() {
    String uid = "";
    for (byte i = 0; i < mfrc522.uid.size; i++) {
        uid += String(mfrc522.uid.uidByte[i], HEX);
    }
    return uid;
}