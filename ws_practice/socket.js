const WenSocket = require('ws');

module.exports = (server) => {
    const wss = new WenSocket.Server({server});
    wss.on('connection', (ws, req) => {//When connecting to web socket
        //The way to figure out client IP
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('access to new client', ip);
        ws.on('message', (message) => {//When receiving message from client
            console.log(message);
        });
        ws.on('error', (error) => {//When coccuring error
            console.error(error);
            clearInterval(ws.interval);
        });
        ws.on('close', () => {//When disconnecting 
            console.log('disconnect client', ip);
        });

        ws.interval = setInterval(() => {
            if(ws.readyState == ws.OPEN){
                ws.send('send message from server to client');
            }
        }, 3000);
    });
};