import { useState } from "react";
import axiosClient from "../../axiosClient.js";

export default function MessageInput({ to, onSend }) {
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (!text.trim()) return;
    try {
      await axiosClient.post("/send-message", {
        number: to,
        message: text,
      });
      setText("");
      onSend?.(); // refresh messages
    } catch (err) {
      console.error("Gagal mengirim:", err);
    }
  };

  return (
    <footer className="p-4 border-t border-gray-700 flex gap-2">
      <input
        className="flex-1 p-2 rounded bg-gray-800 text-white"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ketik pesan..."
      />
      <button
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        onClick={handleSend}
      >
        Send
      </button>
    </footer>
  );
}
