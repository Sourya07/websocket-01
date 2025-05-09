"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8000 });
// let userCount = 0;
let allSockets = [];
wss.on("connection", (socket) => {
    console.log("user connected");
    // userCount = userCount + 1
    // console.log("user connected # " + userCount)
    socket.on("message", (event) => {
        // console.log("message received " + event.toString())
        const parsedMessage = JSON.parse(event.toString()); /// into obj
        if (parsedMessage.type == "join") {
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            });
        }
        if (parsedMessage.type == "chat") {
            const currentUsername = allSockets.find((x) => x.socket == socket);
            if (!currentUsername) {
                console.log("User sent message without joining a room");
                return;
            }
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].room == currentUsername.room) {
                    allSockets[i].socket.send(parsedMessage.payload.message);
                }
            }
        }
    });
});
