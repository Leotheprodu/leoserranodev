---
title: 'Getting started backend with express and MVC design pattern Part 1'
description: 'In this article, you will learn how to start a backend using Express and the MVC (Model View Controller) design pattern'
pubDate: 'Sep 24 2023'
heroImage: '/photo-1534665482403-a909d0d97c67.jpeg'
categories:
    - 'Backend'
---

In this article, you will learn how to start a backend using Express and the MVC (Model View Controller) design pattern. This is Part 1, and in the following volumes, we will configure other aspects. The idea is to show you how to set up MySQL, Express, Express Sessions, Nodemailer, Cors, Dotenv, Slack, and more to get your projects off to a great start!

## Step #1 Create a Working Directory

The first thing to do is to create a directory where we will create our project. In my case, I simply type in my terminal:

```
mkdir nombre_del_proyecto
```

Then, navigate to the directory:

```
cd nombre_del_proyecto
```

## Step #2 Create a Git Repository

```
git init
```

It's important to add a .gitignore file to ensure that unwanted files, such as .env or the node_modules folder, are not committed. Here's an example .gitignore file:

```
# Logs

logs

*.log

img.zip

node_modules

dist

dist-ssr

*.local



# Editor directories and files

.vscode/*

!.vscode/extensions.json

.idea

.DS_Store

*.suo

*.ntvs*

*.njsproj

*.sln

*.sw?

.env

storage/*
```

## Step #3 Create the package.json File

Run the following command to create the package.json file:

```
npm init
```

Follow the prompts.

## Step #4 Create the Necessary Folders to Organize Your Code

Here's the basic structure:

```
├── config/

├── controllers/

├── middleware/

├── models/

├── validators/

└── package.json

```

Why this structure?

### config:

This directory contains code needed to configure your project, such as database connection configuration, Express session settings, payment systems, and more.

### controllers:

This is where you place the logic for your controllers, all the algorithms necessary to receive and deliver what your requests need.

### middleware:

All the middleware needed before being received by your controllers goes in this directory. For example, checking if the requester is a registered user, verifying if an email exists, or converting a string to an integer before sending it to the controller.

### models:

All your database models go in this directory.

### routes:

This directory receives all the requests and directs them to the controllers. It defines all the API routes and implements the necessary middleware.

### utils:

We always need certain functions to help us perform specific tasks. Many of these functions, to avoid code repetition, are created here and only used by controllers that need them. For example, error handling, password hash conversions, date formatting, and more.

### validators:

This directory is typically used to create data validators for the data you receive. Usually, you create one validator per database model to ensure you only receive what's necessary in each request. These validations are actually middleware but are separated for better code organization.

## Step #5 Install Dependencies

For this project, we'll implement Express, manage CORS, and use ESLint for code quality and Prettier for code formatting. Additionally, for my Node.js version, I need Dotenv to read environment variables, but in more recent versions, it may not be necessary. In my case, I'll install it.

```

npm install express cors dotenv

```

```
npm install eslint prettier --save-dev

```

## Step #6 Configuration

### ESLint:

Run the following command to initialize ESLint:

```
npx eslint --init
```

Follow the prompts. For this project, I'm going to use CommonJS and JavaScript.

prettier:

Simply add a `.prettierrc` file to the root of the project to configure Prettier. You can use this configuration:

```
{

    "semi": true,

    "singleQuote": true,

    "tabWidth": 4

}
```

To make Prettier work well with ESLint, install this plugin:

```
npm install eslint-config-prettier --save-dev
```

Next, modify your `.eslintrc.json` file to add `"prettier"` to the list of extensions in `"extends"`. It should look like this:

```
module.exports = {

    globals: {

        process: true,

    },

    env: {

        browser: true,

        commonjs: true,

        es2021: true,

    },

    extends: ['eslint:recommended', 'prettier'],

    overrides: [],

    parserOptions: {

        ecmaVersion: 'latest',

    },

    rules: {},

};
```

It's important to note that you should have the Prettier extension installed in your code editor to automatically format your code when saving.

## Step #7 Finally! It's time to set up our Express server!

Before anything else, add the `.env` and `.env.example` files to the root of your project to define your environment variables and provide a template for other developers. For example:

In .env, add:

```
URL_CORS=http://localhost:3000
```

In .env.example, add:

```
URL_CORS=yourCorsOriginURL
```

Now, create the app.js file in the project's root directory and add the following code:

```javascript
require('dotenv').config({ override: true });

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
```

Now, with this code, your server is ready to use! Simply run `node app.js` in your project folder.

**Important Note:** When making changes to the project, if you use `node app.js`, you must stop the server and restart it to see the changes. This is why it's recommended to use Nodemon. However, if you're using Node version 18.11 or higher, you can use the `--watch` flag to start the server. For example:

```
node --watch app.js
```

To conclude, let me explain what the server configuration code does:

```javascript
require('dotenv').config({ override: true });
```

This line allows you to read the .env file with your environment variables.

```javascript
const express = require('express');
const PORT = process.env.PORT || 5000;
```

We import the Express framework, and PORT is the variable where the system will read the environment variable. If it doesn't exist, it defaults to port 5000.

```javascript
const cors = require('cors');
```

We import the Cors middleware.

```javascript
const app = express();
```

We create an instance of the application.

```javascript
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
```

1. **origin:** `process.env.URL_CORS`: This option specifies which origins (domains) are allowed to access your API.
2. **methods:** `['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS']`: These are the allowed HTTP methods for requests from other domains.
3. **allowedHeaders:** This option specifies which HTTP headers are allowed in requests.
4. **credentials:** `true`: When set to `true`, this allows CORS requests to include credentials such as cookies in the request.

```javascript
app.use(express.json());
```

This line enables the middleware to parse and process data sent to the server in JSON format.

```javascript
const server = app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}...`);
});
```

Finally, this line starts the Express.js server and makes it listen on the port defined in the environment variables or port 5000 if it's not specified.

```javascript
server.timeout = 30000;
```

This line sets the server timeout to 30 seconds, meaning that if a request doesn't complete within that time, the server will interrupt it and could send an error response.

### Congratulations! You have successfully configured your backend with Express using best practices and are ready to start using the Model-View-Controller (MVC) design pattern.

I hope this helps, and I'll be writing more content soon.
