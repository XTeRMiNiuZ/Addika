require('dotenv').config();

const server = require('./server');
//const db = require("./database/models");

//db.sequelize.sync({force: true});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));
