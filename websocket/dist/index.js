"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on("connection", function (socket) {
    console.log("user connected");
    // setInterval(() => {
    //     socket.send("ping")
    // }, 1000)
    socket.on("message", (e) => {
        if (e.toString() === "ping") {
            console.log('Received from client:', e.toString());
            socket.send("pomg");
        }
    });
});
