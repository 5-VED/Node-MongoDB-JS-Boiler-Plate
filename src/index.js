const express = require("express");
require('dotenv').config()
const logger = require('./config/logger');
const connectDB = require('./Database/dbConnection');
const routes = require("./Routes");
const message = require("./Constants/message.js");
const cors = require("cors");
const { default: helmet } = require("helmet");
const morgan = require("./config/morgan");  
const apiResponse = require("./Utils/api.response");

const app = express();

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        logger.info(`Listening to port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log(`---error--`, error);
}); 
app.use(express.json());

app.options("*", cors());
app.use(cors({ origin: "*" }));
app.use(helmet());

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use("/api/v1", routes);

app.use((req, res, next) => {
    return apiResponse.NOT_FOUND({ res, message: message.ROUTE_NOT_FOUND })
});

