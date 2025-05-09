import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'




function App() {
    const [message, setmessage] = useState(["hii there priyanshu", "hello"]);
    const [inputM, Setinput] = useState("");
    const wsRef = useRef();
    useEffect(() => {
        const ws = new WebSocket("http://localhost:8000")
        ws.onopen = () => {
            console.log('Connection established');

        }
        ws.onmessage = (event) => {
            setmessage(m => [...m, event.data])
        }
        wsRef.current = ws;

        ws.onopen = () => {
            ws.send(JSON.stringify({

                "type": "join",
                "payload": {
                    "roomId": "123"
                }

            }))
        }

    })

    return (
        <>
            <div className="h-screen flex items-center justify-center bg-gray-900">
                <div className="bg-black text-white rounded-2xl shadow-lg w-full max-w-md h-[600px] flex flex-col p-4">

                    <div className="text-lg font-semibold mb-4 text-center">
                        Chat Room
                    </div>


                    <div id="chat-box" className="flex-1 overflow-y-auto mb-4 space-y-2 px-1">


                        {message.map(message => <div className="bg-gray-800 p-2 rounded">{message}</div>)}

                        <div className="bg-gray-700 p-2 rounded self-end text-right">Hi there!</div>
                    </div>


                    <div className="flex gap-2">
                        <input
                            id="chat-input"
                            type="text"
                            placeholder="Type your message..."
                            className="flex-1 bg-gray-800 text-white rounded px-3 py-2 outline-none"
                            onChange={(e) => Setinput(e.target.value)}
                        />
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            onClick={() => {
                                wsRef.current.send(JSON.stringify({
                                    type: "chat",
                                    payload: {
                                        message: inputM
                                    }
                                }))
                            }}

                        >
                            Send
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default App
