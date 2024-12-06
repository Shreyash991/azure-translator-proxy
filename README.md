# Azure Translation API Documentation

Welcome to the **Azure Translation API Documentation**, created by **Shreyash Thakre**. This documentation provides a comprehensive guide to using the Translation API for translating text between multiple languages. The API leverages Azure Cognitive Services and supports features like single and multiple translations, language detection, and retrieving a list of supported languages.

---

## Table of Contents

1. [Introduction](#introduction)  
2. [API Overview](#api-overview)  
3. [Authentication](#authentication)  
4. [Base URL](#base-url)  
5. [Endpoints](#endpoints)  
6. [Request & Response Examples](#request--response-examples)  
7. [Error Handling](#error-handling)  
8. [Interactive API Testing (Swagger UI)](#interactive-api-testing-swagger-ui)  
9. [Error Codes](#error-codes)  
10. [FAQ](#faq)  

---

## Introduction

The Translation API enables developers to:
- Translate text into several languages.
- Detect the language of the input text.
- Perform multiple translations simultaneously.
- Retrieve a list of supported languages.

---

## API Overview

### Key Features:
- Translate single or multiple texts.
- Detect input text language.
- Access a list of supported languages.

---

## Authentication

This API uses Azure API keys for authentication. Include the following headers in your request:

```http
Ocp-Apim-Subscription-Key: <your-api-key>
Ocp-Apim-Subscription-Region: <your-region>
Content-Type: application/json
```

### Example:
```http
Authorization: Bearer <your-api-key>
```

---

## Base URL

All API requests use the following base URL:

```plaintext
http://<your-server-ip>:<port>/api/v1
```

**Example:**
```plaintext
http://104.131.126.122:3000/api/v1
```

---

## Endpoints

### **POST** `/api/v1/translate/translate-single`
- **Description:** Translates a single text.
- **Request Body:**
    ```json
    {
      "text": "Hello",
      "toLanguage": "fr"
    }
    ```
- **Response Body:**
    ```json
    {
      "translations": [
        {
          "text": "Bonjour",
          "to": "fr"
        }
      ]
    }
    ```

### **POST** `/api/v1/translate/translate-multiple`
- **Description:** Translates multiple texts.
- **Request Body:**
    ```json
    {
      "texts": ["Hello", "Good morning"],
      "toLanguage": "fr"
    }
    ```
- **Response Body:**
    ```json
    {
      "translations": [
        {
          "text": "Bonjour",
          "to": "fr"
        },
        {
          "text": "Bonjour le matin",
          "to": "fr"
        }
      ]
    }
    ```

### **POST** `/api/v1/translate/detect-language`
- **Description:** Detects the language of a given text.
- **Request Body:**
    ```json
    {
      "text": "Hola"
    }
    ```
- **Response Body:**
    ```json
    {
      "language": "es"
    }
    ```

### **GET** `/api/v1/translate/supported-languages`
- **Description:** Retrieves a list of supported languages.
- **Response Body:**
    ```json
    {
      "languages": ["en", "fr", "es", "de", "it", "pt", "nl", "ar", "zh", "ja"]
    }
    ```

---

## Request & Response Examples

### Example 1: Translate Single Text
- **Request:**
    ```json
    POST /api/v1/translate/translate-single
    {
      "text": "Hello",
      "toLanguage": "fr"
    }
    ```
- **Response:**
    ```json
    {
      "translations": [
        {
          "text": "Bonjour",
          "to": "fr"
        }
      ]
    }
    ```

### Example 2: Detect Language
- **Request:**
    ```json
    POST /api/v1/translate/detect-language
    {
      "text": "Bonjour"
    }
    ```
- **Response:**
    ```json
    {
      "language": "fr"
    }
    ```

### Example 3: Translate Multiple Texts
- **Request:**
    ```json
    POST /api/v1/translate/translate-multiple
    {
      "texts": ["Hello", "Good morning"],
      "toLanguage": "fr"
    }
    ```
- **Response:**
    ```json
    {
      "translations": [
        {
          "text": "Bonjour",
          "to": "fr"
        },
        {
          "text": "Bonjour le matin",
          "to": "fr"
        }
      ]
    }
    ```

### Example 4: Supported Languages
- **Request:**
    ```json
    GET /api/v1/translate/supported-languages
    ```
- **Response:**
    ```json
    {
      "languages": ["en", "fr", "es", "de", "it", "pt", "nl", "ar", "zh", "ja"]
    }
    ```

---

## Error Handling

### Common Errors:
- **400 Bad Request:** Invalid or missing parameters.
- **401 Unauthorized:** Invalid API key.
- **404 Not Found:** Endpoint not found.
- **500 Internal Server Error:** Unexpected server error.

**Example Error Response:**
```json
{
  "error": {
    "code": "BadRequest",
    "message": "The 'text' parameter is missing."
  }
}
```

---

## Interactive API Testing (Swagger UI)

Test the API directly using Swagger UI at:  
[http://104.131.126.122:3000/api-docs/](http://104.131.126.122:3000/api-docs/)

---

## Error Codes

- **400:** Bad Request
- **401:** Unauthorized
- **500:** Internal Server Error

---

## FAQ

1. **How do I obtain my API key?**  
   Sign up for Azure Cognitive Services and create a Translation resource.

2. **Do I need a Microsoft account for Azure?**  
   You can use either a Microsoft or GitHub account.  

--- 

**Created by:** Shreyash Thakre

---

This should now meet your request for four examples along with the Swagger UI link. Let me know if you need any more changes!
