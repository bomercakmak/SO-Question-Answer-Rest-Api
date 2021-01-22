const express = require('express');
const dotenv = require('dotenv');
const connectDatabase = require('./helpers/database/connetDatabase')
const {costumErrorHandler} = require('./middlewares/errors/costumErrorHandeler')
const routers = require('./routers/index')
const path = require('path')

// Enviroment   Variables
dotenv.config({
    path : "./config/env/config.env"
})
// MangoDb Connection
connectDatabase();

const app = express();

// Express - Body Middleware

app.use(express.json());
const PORT = process.env.PORT;

//Routers Middleware
app.use("/api", routers);

// Eror Hamdeler
app.use(costumErrorHandler);

// Static Files

app.use(express.static(path.join(__dirname,"public")))
app.listen(PORT, () => {
    console.log(`App Started on ${PORT}:${process.env.NODE_ENV}`)
})

