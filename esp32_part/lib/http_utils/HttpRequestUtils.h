#ifndef HTTP_REQUEST_UTILS_H
#define HTTP_REQUEST_UTILS_H

#include <Arduino.h>

class HttpRequestUtils {
public:
    static String get(const char* serverName);
    static String post(const char* serverName, const String& body);
    static String put(const char* serverName, const String& body);
    static String del(const char* serverName);
private:
    static String sendRequest(const char* url, const String& method, const String& body = "");
    static const char* CONTENT_TYPE;
    static const char* EMPTY_JSON;
};

#endif
