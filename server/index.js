const express = require('express');
const cors = require("cors");
const routes = require('../routes');
const errorHandler = require('../helpers/error-handler');

const server = express();
let corsOptions = {
  origin: "http://localhost:8081"
};

server.use(cors(corsOptions));
server.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

server.use('/api', routes);

// global error handler
server.use(errorHandler);

module.exports = server;
