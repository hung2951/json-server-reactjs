// See https://github.com/typicode/json-server#module
const cors = require('cors');
const jsonServer = require('json-server')
const server = jsonServer.create()
const auth = require("json-server-auth");
const db = require("./db.json");
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();
server.use(cors())
server.use(middlewares)
server.db = router.db;
server.use(auth);
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
      req.body.createdAt = Date.now()
    }
    next()
  })
server.use(router)
server.listen(8000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server
