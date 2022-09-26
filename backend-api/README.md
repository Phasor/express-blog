# Express REST API for Blog

This is RESTful API built using Express.js to serve HTTP endpoints for a blog web applications.

## Starting the Server

Install dependencies:
`npm install`

Run the developement server:
`npm run devstart`

## .ENV

The application expects to be able to connect to a MongoDB database instance. Fill in the variables in `.env.template` and rename the file `.env`.

## Authorisation and Authentication

The application makes `Passport.js` and the `JWT` strategy.  It implements role based authorisation for Users and Admins. Users are restricted to reading posts and writing comments. Admins can perform an array of CRUD operations on Posts, Comments Users. 

