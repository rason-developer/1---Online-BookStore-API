const http = require("http");
const app = require("./app");
const logger = require("./logger/winston");
//const createTable = require("./config/dbSetup");

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);



server.listen(PORT, () => {
   logger.info(`Server is running on port ${PORT}`);
});

//createTable();
