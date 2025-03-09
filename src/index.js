const express = require("express");
require('dotenv').config()
const logger = require('./config/logger');
const connectDB = require('./db/dbConnection');
const routes = require("./routes");
const message = require("./json/message.json");
const cors = require("cors");
const { default: helmet } = require("helmet");
const morgan = require("./config/morgan");  
const apiResponse = require("./utils/api.response");

const app = express();

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        logger.info(`Listening to port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log(`---error--`, error);
}); // Db connected.
app.use(express.json());

app.options("*", cors());
app.use(cors({ origin: "*" }));
app.use(helmet());

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use("/api/v1", routes);

app.use((req, res, next) => {
    return apiResponse.NOT_FOUND({ res, message: message.route_not_found })
});

