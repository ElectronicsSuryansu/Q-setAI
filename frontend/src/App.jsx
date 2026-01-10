import { useState } from 'react'

import ChatBox from "./components/ChatBox";
import UploadBar from "./components/UploadBar";

function App() {
  const [messages , setMessages] = useState([]);

  return (
    <div className="app">
      <ChatBox messages={messages} />
      <UploadBar setMessages={setMessages} />  {/* ✅ fixed */}
    </div>
  )
}

export default App
