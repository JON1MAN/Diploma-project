
# Access control system using RFID technology and remote management via a web application.

## Table of Contents

- [Technical story](#technical-story)
- [Java Spring Backend](#java-spring-backend)
  - [UML](#uml)
  - [Endpoints](#endpoints)
    - [`POST /esp/register`](#post-espregister)
    - [`DELETE /esp`](#delete-esp)
    - [`GET /esp/validate`](#get-espvalidate)


## Technical story
There is a keyboard. User can select 3 modes:  
1. **To add new card** to a database by attaching it to rfid reader -> rc522 module will read card code and esp32 will send it to backend server **to register new card** -> Backend creates new user with his card, user will have his unique id, card id, (unique username and history of enters / exits) -> backend will response as 200 OK, 409 Conflict if card was already registered, or 500 if there was a server problem (for example unexpected exception, server down by provider and etc.)

2.  **To delete current card** - user attaches a card to rfid reader -> rc522 module will read card code and esp32 will send it to backend server **to delete attached card**  -> Backend will find this card by **it’s hex code** in database and perform **SAFE DELETE** (so with safe delete we will have some history about deleted users, maybe we will use their data somehow in future, and maybe there is an option for **a cronjob** that will clean safe deleted cards after some time). Possible responses from backend: 200 OK, 404 NOT FOUND, 500 (internal server error).

3.  **To open / close a door lock** - user attaches a card to rfid reader -> there we need a validation of lock state (maybe it’s already opened, so there is no need for next steps), if door is locked we need to validate current card, by sending validation request to backend -> Backend needs to find this card by hex code and check if it’s not deleted, user is not blocked by admin and so on. -> Response 200 OK means we need to open a lock, 404 Not Found means that there is no card in our database and we can register it as new one, 500 (internal server error).

## Java Spring Backend
We will have two user types:

1.  ADMIN - he enters an admin panel (our web application to manage cards, ban users with their cards, see history of enters). By default there is only one admin with username admin and password root, so you can add more admins in future.

2.  DEFAULT - that one will be registered by default when registering a card, Admin can modify this user (edit username, ban, delete a card).

### UML:
<img width="981" height="514" alt="UML_BASE" src="https://github.com/user-attachments/assets/e01b9842-81f5-45de-8aff-cf537f905c92" />


### Endpoints:

**POST /esp/register:** - to register new card when attached

Json body **CardDTO**:  
```
{
   “cardHex” : “string”
}
```
  
**Possible responses:**  
**200** OK - Success!
**409** Conflict - Provided card already registered!
**500** internal server error

  
**DELETE /esp:** - to delete card that has provided hex code
Json body **CardDTO**:  
```
{
   “cardHex” : “string”
}
```
**Possible responses:**
**200 OK -** Success!
**404** Not Found - Card not found!
**500** Internal server error**  
  
**GET /esp/validate**  - to validate if attached card has access (not banned and registered)
Json body  **CardDTO:**

```
{
   “cardHex” : “string”,
   “lockStatus” : “string” // one of : CLOSED, OPENED
}
```

**Possible Responses:**
**200** OK - Success!  
**404** Not found - Card not found!
**403** Forbidden - No access!
**409** Conflict - Lock already opened (if there was a mistake in esp validator on first step)  
**500** Internal server error
