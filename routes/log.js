const { authJwt } = require("../middleware");
const { ctrlLog } = require('../controllers/index');

module.exports = (router) => {
  router.get(
    '/logs',
    [authJwt.verifyToken, authJwt.isAdmin],
    ctrlLog.getAllLogs
  )
}