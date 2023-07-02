# Lab 06
## basic-auth
Author: Sham Al-Jalam

* deployed application : [https://api-server-5vp7.onrender.com/](https://api-server-5vp7.onrender.com/)

* Github actions: [https://github.com/ShamAhmad2022/api-server/actions](https://github.com/ShamAhmad2022/api-server/actions)

*  pull request: [https://github.com/ShamAhmad2022/api-server/pull/4](https://github.com/ShamAhmad2022/api-server/pull/4)

### Setup:
.env requirements:

PORT - 3000

### Running the app:
* npm start

* Endpoint: /

    * Returns Object
    ```Js
    {
        "code": 200,
        "message": "Welcome to Home page :)"
    }
    ```

* Endpoint: /signup

    * Returns Object
    ```Js
    {
    "id": 7,
    "username": "Ben",
    "password": "$2b$05$H/StwL3uFpLKo0IgtO61KOn6WWgH7NWkNRb4DFBxmSR/gJyIRW30G",
    "createdAt": "2023-07-01T17:23:33.624Z",
    "updatedAt": "2023-07-01T17:23:33.624Z"
    }
    ```
* Endpoint: /signin

    * Returns Object
    ```Js
    {
    "user": {
            "id": 7,
            "username": "Ben",
            "password": "$2b$05$H/StwL3uFpLKo0IgtO61KOn6WWgH7NWkNRb4DFBxmSR/gJyIRW30G",
            "createdAt": "2023-07-01T17:23:33.624Z",
            "updatedAt": "2023-07-01T17:23:33.624Z"
        }
    }
    ```

* server errors

    * Returns Object
    ```Js
    {
        "code": 500,
        "route": "/intentionalError",
        "query": {},
        "body": {
            "test": "test"
        },
        "message": "Server ERROR:some kind of error :("
    }
    ```

* not found pages:

    * Returns Object
    ```Js
    {
        "code": 404,
        "message": "Page not found :( ",
        "route": "/help"
    }
    ```
### Test:
* Unit Test: npm test

### WRRC
![](./src/images/WRRClab03.jpg)