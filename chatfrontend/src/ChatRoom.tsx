// ChatRoom.tsx
import { useEffect, useRef, useState } from 'react';

function ChatRoom({ roomId }: { roomId: string }) {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000'); // Important: ws://
        wsRef.current = ws;

        ws.onopen = () => {
            console.log('WebSocket connected');
            ws.send(
                JSON.stringify({
                    type: 'join',
                    payload: { roomId },
                })
            );
        };

        ws.onmessage = (event) => {
            setMessages((prev) => [...prev, event.data]);
        };

        return () => {
            ws.close();
        };
    }, [roomId]);

    const handleSend = () => {
        if (input.trim() && wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(
                JSON.stringify({
                    type: 'chat',
                    payload: { message: input },
                })
            );
            setMessages((prev) => [...prev, `YOU: ${input}`]);
            setInput('');
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-black rounded-2xl shadow-lg w-full max-w-md h-[600px] flex flex-col p-4">
                <div className="text-lg font-semibold mb-4 text-center">
                    Room: {roomId}
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                    {messages.map((msg, i) => {
                        const isUser = msg.startsWith('YOU:');
                        return (
                            <div
                                key={i}
                                className={`max-w-[75%] px-3 py-2 rounded ${isUser
                                    ? 'bg-gray-700 self-end ml-auto text-right'
                                    : 'bg-gray-800 self-start mr-auto text-left'
                                    }`}
                            >
                                {isUser ? msg.replace('YOU: ', '') : msg}
                            </div>
                        );
                    })}
                </div>

                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 bg-gray-800 text-white rounded px-3 py-2 outline-none"
                    />
                    <button
                        onClick={handleSend}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;