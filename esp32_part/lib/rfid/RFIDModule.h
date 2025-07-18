#ifndef RFID_MODULE_H
#define RFID_MODULE_H

#include <MFRC522.h>

class RFIDModule {
public:
    RFIDModule(uint8_t ssPin, uint8_t rstPin);
    void begin();
    bool isCardPresent();
    String readCardUID();

private:
    MFRC522 mfrc522;
};

#endif
