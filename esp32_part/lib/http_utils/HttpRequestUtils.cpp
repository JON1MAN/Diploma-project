#include "HttpRequestUtils.h"
#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>

const char* HttpRequestUtils::CONTENT_TYPE = "application/json";
const char* HttpRequestUtils::EMPTY_JSON = "{}";

String HttpRequestUtils::get(const char* url) {
    return sendRequest(url, "GET");
}

String HttpRequestUtils::post(const char* url, const String& body) {
    return sendRequest(url, "POST", body);
}

String HttpRequestUtils::put(const char* url, const String& body) {
    return sendRequest(url, "PUT", body);
}

String HttpRequestUtils::del(const char* url) {
    return sendRequest(url, "DELETE");
}

String HttpRequestUtils::sendRequest(const char* url, const String& method, const String& body) {
    WiFiClient client;
    HTTPClient http;

    http.begin(client, url);
    Serial.println("Performing HTTP " + method + " request to: " + String(url));

    int httpResponseCode = -1;

    if (method == "GET") {
        httpResponseCode = http.GET();
    } else if (method == "POST") {
        http.addHeader("Content-Type", CONTENT_TYPE);
        httpResponseCode = http.POST(body);
    } else if (method == "PUT") {
        http.addHeader("Content-Type", CONTENT_TYPE);
        httpResponseCode = http.PUT(body);
    } else if (method == "DELETE") {
        httpResponseCode = http.sendRequest("DELETE");
    } else {
        Serial.println("Unsupported HTTP method: " + method);
        http.end();
        return EMPTY_JSON;
    }

    String response = EMPTY_JSON;

    if (httpResponseCode > 0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        response = http.getString();
    } else {
        Serial.print("HTTP Error code: ");
        Serial.println(httpResponseCode);
    }

    http.end();
    return response;
}
