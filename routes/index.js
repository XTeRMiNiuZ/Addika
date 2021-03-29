const { Router } = require('express');

const router = Router();

//router.get('/', (req, res) => res.send('Welcome'))
require('./post')(router)
require('./user')(router)
require('./auth')(router)
require('./review')(router)
require('./log')(router)

module.exports = router;