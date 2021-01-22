const SocketIO = require('socket.io');

module.exports = (server) => {
    //This path option must has same path with client-side connect method
    const io = SocketIO(server, {path: '/socket.io'});

    io.on('connection', (socket) => { //When connecting to web socket, provide socket object as callback
        //request socket object, socket.request.res is response socket object.
        //socket.id is unique id for socket
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('new client connected', ip, socket.id, req.ip);
        socket.on('disconnect', () => {//disconnect
            console.log('disconnect client', ip, socket.id);
            clearInterval(socket.interval);
        });
        socket.on('error', (error) => {//error
            console.error(error);
        });
        //reply is user-defined event
        socket.on('reply', (data) => {//when client sending data
            console.log(data);
        });
        socket.interval = setInterval(() => {
            //emit('user-defined event', 'message to send to client');
            socket.emit('news', 'Hello Socket.IO');
        }, 3000);
    });
};