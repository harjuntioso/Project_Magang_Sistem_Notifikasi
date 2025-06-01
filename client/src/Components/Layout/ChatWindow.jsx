import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import MessageInput from "./MessageInput";

export default function ChatWindow({ chat }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!chat) return;
    const fetchMessages = async () => {
      const res = await axiosClient.get(`/messages/${chat.id._serialized}`);
      setMessages(res.data);
    };
    fetchMessages();
  }, [chat]);

  if (!chat) {
    return (
      <main className="flex-1 flex items-center justify-center bg-gray-950 text-white">
        <p className="text-gray-500">.....</p>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col bg-gray-950 text-white">
      <header className="p-4 border-b border-gray-700">
        <h3 className="font-bold">{chat.name || chat.id.user}</h3>
        <p className="text-sm text-gray-400">{chat.id._serialized}</p>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-xs ${
                msg.fromMe ? "bg-green-600" : "bg-gray-700"
              }`}
            >
              {msg.body}
            </div>
          </div>
        ))}
      </div>

      <MessageInput to={chat.id._serialized} onSend={() => {
        // refresh after sending
        axiosClient.get(`/messages/${chat.id._serialized}`).then(res => {
          setMessages(res.data);
        });
      }} />
    </main>
  );
}
