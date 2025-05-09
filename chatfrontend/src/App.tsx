// App.tsx
import { useState } from 'react';
import JoinRoom from './JoinRoom';
import ChatRoom from './ChatRoom';

function App() {
  const [roomId, setRoomId] = useState<string | null>(null);

  return (
    <>
      {roomId ? (
        <ChatRoom roomId={roomId} />
      ) : (
        <JoinRoom onJoin={setRoomId} />
      )}
    </>
  );
}

export default App;