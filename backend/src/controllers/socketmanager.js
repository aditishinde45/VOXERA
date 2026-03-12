import { Server } from "socket.io"

let connections = {};
let messages = {};
let timeOnline = {};

const ConnectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true,
        }
    });

    io.on("connection", (socket) => {
        console.log("something connected !");

        socket.on("join-call", (path) => {
            if (connections[path] == undefined) {
                connections[path] = [];
            }
        
            connections[path].push(socket.id);
            timeOnline[socket.id] = new Date();
        
            const clients = connections[path];
        
            // Send full client list to everyone
            clients.forEach(id => {
                io.to(id).emit("user-joined", socket.id, connections[path]);
            });
        
            if (messages[path] != undefined) {
                messages[path].forEach(message => {
                    io.to(socket.id).emit(
                        "chat-message",
                        message['data'],
                        message['sender'],
                        message['socket-id-sender']
                    );
                });
            }
        });

        socket.on("signal", (toId, msg) => {
            io.to(toId).emit("signal", socket.id, msg);
        });

        socket.on("chat-message", (data, sender) => {
            const [matchingRoom, found] = Object.entries(connections).reduce(
                ([room, isFound], [roomKey, roomValue]) => {
                    if (!isFound && roomValue.includes(socket.id)) {
                        return [roomKey, true];
                    }
                    return [room, isFound];
                },
                ['', false]
            );

            if (found == true) {
                if (messages[matchingRoom] == undefined) {
                    messages[matchingRoom] = [];
                }

                messages[matchingRoom].push({
                    'sender': sender,
                    "data": data,
                    "socket-id-sender": socket.id
                });

                console.log("message", matchingRoom, ":", sender, data);

                connections[matchingRoom].forEach(element => {
                    io.to(element).emit("chat-message", data, sender, socket.id);
                });
            }
        });

        socket.on("disconnect", () => {
            var diffTime = Math.abs(timeOnline[socket.id] - new Date());

            var key;

            for (const [k, v] of Object.entries(connections)) {
                for (let a = 0; a < v.length; ++a) {
                    if (v[a] == socket.id) {
                        key = k;

                        for (let a = 0; a < connections[key].length; ++a) {
                            io.to(connections[key][a]).emit('user-left', socket.id);
                        }

                        var index = connections[key].indexOf(socket.id);
                        connections[key].splice(index, 1);

                        if (connections[key].length == 0) {
                            delete connections[key];
                        }
                    }
                }
            }
        });
    });

    return io;
}

export default ConnectToSocket;
