import Message from "./Message";

export default function ChatBox({ messages }) {
  return (
    <div className="chat-box">
      {messages.map((msg, i) => (
        msg.role === "user" ?
          <div key={i} className="user">{msg.text}</div> :
        <div className="assistant">{msg.text}</div>

      ))}
    </div>
  );
}
