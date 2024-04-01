# Whats-API

This API allows you to send messages with whatsapp. The API runs an instance of web-whatsapp in a headless browser. It is not an official API provided by Whatsapp, so use it at your own risk.

### Startup

1. Rename `.env.example` to `.env` and add the the variables.
2. Run install dependencies (`npm i`)
3. Run `npm run dev`

### How to use

This API provides two endpoints:

- GET `/api/whatsapp/authenticate` returns a screenshot of the QR code to authenticate web-whatsapp and couple it to your profile.
- POST `/api/whatsapp` allows you to send messages. The body should have the following format:

  ```
    {
      "messages": [
          {
              "phoneNumber": "+31612345678",
              "recipientName": "John Doe",
              "text": "Very personal message"
          }
      ]
    }
  ```

  Make sure the `phoneNumber` uses the correct format and countrycode and the `recipientName` matches the name in your phone exacty (case sensitive), otherwise the message will not be sent.
