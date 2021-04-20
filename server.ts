const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.rewriter({
    "/chats/:resource/messages": "/:resource",
    "/chats/:resourse/messages/:id": "/:resourse/:id",
    "/chats//messages": "/start"
}));

server.delete('/:name', function(req, res) {
    var obj = {};
    router.db.defaults(obj).unset(req.params.name).write();
    res.sendStatus(201);
});

server.use(router);
server.listen(3003, () => {
    console.log('JSON Server is running');
})