# Stack Overflow Question Answer RestApi

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Create MongoDb Cluster and Get Connection MongoDb URI
- Set environment variables in `config.env` under `./config/env`
  * Set `MONGO_URI = <YOUR_MONGO_URI>`
  * Set `JWT_SECRET_KEY = <YOUR_SECRET_KEY>`
  * Set `SMTP_EMAIL=<YOUR_GMAIL_EMAIL>`
  * Set `SMTP_PASS=<YOUR_GMAIL_PASSWORD>`
- `node dummy-generator.js --import` to load dummy data to database
- `npm run dev` to start the local server

## Application Structure

- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also inncludes the routes we'll be using in the application.
- `config/` - This folder contains configuration for central location environment variables and other configurations.
- `routes/` - This folder contains the route definitions (answer, question etc. ) for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models (User, Question).
- `controllers/` - This folder contains controllers for our API.
- `public/` - This folder contains static files for our API.
- `middlewares/` - This folder contains middlewares for our API.
- `helpers/` - This folder contains helper functions for adapting 3rd party libraries for our API.
- `dummy/` - This folder contains dummy data created by dummy-generator.js file for our database.




This project is still being developed — Contributions and Issues are all welcome!