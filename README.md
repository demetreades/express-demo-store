# express-demo-store

<br>

Express restful API with mongoose, react, basic authentication via JWT local storage and Postman collection.

- server: http://localhost:5000/
- client: http://localhost:3000/

<br>

### Installation

1.  Run `npm i` to install dependencies on server and client or run `npm run fresh`

1.  To seed database with users, products and orders: `npm run DATA:import`

1.  Create config `.env` file under root folder

##### .env example

    NODE_ENV=development

    PORT=5000 HOST=localhost PROTOCOL=http

    MONGO_URI=mongodb://localhost:27017

    DB_NAME=demo-store

    JWT_SECRET=289f52c34d7af6a4aadadeb58641b60c9246077c6aa0ff1d

### Start

Run server and client separately

    npm run server
    npm run client

##### Login credenticals

admin

    email: admin@user.com , password: 12345678

user

     email: user1@email.com , password: 12345678

<br>

<br>

<br>

<br>

<br>

Enjoy !
