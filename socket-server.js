var socketIO = require('socket.io');
var ot = require('ot');
var roomList = {};

module.exports = function (server) {
    var str = '//Write your code here and collaborate in real time\n\n';

    // Connect socket.io to the HTTP server
    var io = socketIO(server);

    // Listen for new connections to Socket.io
    io.on('connection', function (socket) {
        console.log("connected");

        socket.on('joinRoom', function (data) {
        
            if (!roomList[data.room]) {
    
                var socketIoServer = new ot.EditorSocketIOServer(str, [], data.room, function (socket, cb) {
                    var self = this;

                    Task.findByIdAndUpdate(data.room, { content: self.document }, function (err) {
                        if (err) return cb(false);
                        cb(true);
                    })
                });
                console.log(socketIoServer)
                roomList[data.room] = socketIoServer;
            }

            roomList[data.room].addClient(socket);
            roomList[data.room].setName(socket, data.username);
            socket.room = data.room;
            socket.join(data.room);
        });

        socket.on('chatMessage', function (data) {
            io.to(socket.room).emit('chatMessage', data);
        });

        socket.on('disconnect', function () {
            socket.leave(socket.room);
        });
    })
}

