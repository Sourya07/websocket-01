import { WebSocketServer, WebSocket } from "ws";

interface User {
    socket: WebSocket;
    room: string;
}

const wss = new WebSocketServer({ port: 8000 })
// let userCount = 0;
let allSockets: User[] = []

wss.on("connection", (socket) => {
    console.log("user connected")
    // userCount = userCount + 1
    // console.log("user connected # " + userCount)


    socket.on("message", (event) => {
        // console.log("message received " + event.toString())
        const parsedMessage = JSON.parse(event.toString()); /// into obj
        if (parsedMessage.type == "join") {
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }
        if (parsedMessage.type == "chat") {
            const currentUsername = allSockets.find((x) => x.socket == socket)
            if (!currentUsername) {
                console.log("User sent message without joining a room");
                return;
            }


            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].room == currentUsername.room) {
                    allSockets[i].socket.send(parsedMessage.payload.message)
                }
            }
        }


    })



})