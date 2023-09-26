---
title: 'Configuration of mysql connection with Sequelize - MVC Backend part 2'
description: 'This is the second part to configure our MVC backend with Express and MySQL.'
pubDate: 'Sep 26 2023'
heroImage: '/photo-1534665482403-a909d0d97c67.jpeg'
categories:
    - 'Backend'
    - 'MVC Backend'
    - 'MySql'
---

This is the second part to configure our MVC backend with Express and MySQL. In Part 1, we create the necessary caps and configure and install Express.

Now we are going to use Sequelize to connect our database with MySQL. Let's start.

First, you have to install the necessary dependencies:

```
npm install --save sequelize mysql2
```

Now you must create your database and add your credentials to the `.env` file, something like this:

```
DB_USER=YourDBUser

DB_PASSWORD=YourDBPassword

DB_NAME=NameOfYourDB
```

Note: Remember to add this to your `.env.example`.

Now we will add the `mysql.js` file to the config folder of our project, where we are going to configure the connection to our database: You can copy this code:

```javascript
const { Sequelize } = require('sequelize');

const database = process.env.DB_NAME;

const username = process.env.DB_USER;

const password = process.env.DB_PASSWORD;

const host = 'localhost';

const sequelize = new Sequelize(database, username, password, {
    host,

    dialect: 'mysql',
});

const dbConnectMySql = async () => {
    try {
        await sequelize.authenticate();

        console.log('MYSQL Successfull Connection');
    } catch (e) {
        console.log('MYSQL Error Connection', e);
    }
};

module.exports = { sequelize, dbConnectMySql };
```

This code is a Node.js module that uses the Sequelize library to connect to a MySQL database. Let's break down the code step by step:

Import Sequelize:

```javascript
const { Sequelize } = require('sequelize');
```

Database credentials configuration:

```javascript
const database = process.env.DB_NAME;

const username = process.env.DB_USER;

const password = process.env.DB_PASSWORD;

const host = 'localhost';
```

These lines retrieve the database credentials (database name, username, and password) from environment variables.

Creating a Sequelize instance:

```javascript
const sequelize = new Sequelize(database, username, password, {
    host,

    dialect: 'mysql',
});
```

Here, a Sequelize instance is created by passing the database credentials, the host name (in this case, 'localhost'), and the dialect to be used, which is MySQL

`dbConnectMySql` function:

```javascript
const dbConnectMySql = async () => {
    try {
        await sequelize.authenticate();

        console.log('MYSQL Successfull Connection');
    } catch (e) {
        console.log('MYSQL Error Connection', e);
    }
};
```

This asynchronous function (`async`) is responsible for establishing a connection to the MySQL database using the Sequelize instance created earlier. Inside the `try` block, it attempts to authenticate with the database. If the authentication is successful, it prints "MYSQL Successfully Connected." If there is any error during the connection, it will be caught in the `catch` block, and an error message along with the error details will be printed.

Exporting the module:

```javascript
module.exports = { sequelize, dbConnectMySql };
```

Now we simply import the function in our root file of our project in this case `app.js` and we use our connection function `dbConnectMySql`.

Import the function:

```javascript
const { dbConnectMySql } = require('./config/mysql');
```

use the function:

```javascript
dbConnectMySql();
```

The code of our file should look something like this:

```javascript
require('dotenv').config({ override: true });

const { dbConnectMySql } = require('./config/mysql');

const express = require('express');

const PORT = process.env.PORT || 5000;

const cors = require('cors');

const app = express();

app.use(
    cors({
        origin: process.env.URL_CORS,

        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],

        allowedHeaders: [
            'Content-Type',

            'Origin',

            'X-Requested-With',

            'Accept',

            'x-client-key',

            'x-client-token',

            'x-client-secret',

            'Authorization',
        ],

        credentials: true,
    }),
);

app.use(express.json());

const server = app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}...`);
});

server.timeout = 30000;

dbConnectMySql();
```

## Ready! Now your backend has a connection with your database in MySQL.
