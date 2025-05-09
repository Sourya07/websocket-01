// JoinRoom.tsx
import { useState } from 'react';

function JoinRoom({ onJoin }: { onJoin: (roomId: string) => void }) {
    const [roomInput, setRoomInput] = useState('');

    return (
        <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-black p-6 rounded-lg shadow-xl w-96">
                <h2 className="text-xl mb-4 text-center font-semibold">Join Chat Room</h2>
                <input
                    type="text"
                    placeholder="Enter Room ID"
                    value={roomInput}
                    onChange={(e) => setRoomInput(e.target.value)}
                    className="w-full p-2 mb-4 rounded bg-gray-800 outline-none"
                />
                <button
                    onClick={() => onJoin(roomInput)}
                    className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                >
                    Join
                </button>
            </div>
        </div>
    );
}

export default JoinRoom;