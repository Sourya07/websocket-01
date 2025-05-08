import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [inputValue, setInputValue] = useState('');

  function sendMessage() {
    if (!socket) {
      return
    }
    socket.send(inputValue)
  }


  // useRef

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');

    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
    }
    setSocket(newSocket);
    return () => newSocket.close();
  }, [])

  return (
    <>
      <div>
        <input
          type="test"
          placeholder='messsage'
          onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={sendMessage} >OnClick</button>

      </div>
    </>
  )
}

export default App
