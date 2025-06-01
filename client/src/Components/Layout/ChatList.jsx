import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";

export default function ChatList({ onSelectChat }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const res = await axiosClient.get("/chats");
      setChats(res.data);
    };
    fetchChats();
  }, []);

  <ul>
  {chats.map((chat, index) => {
    const key = chat?.id?._serialized || chat?.id || index;

    return (
      <li
        key={key}
        onClick={() => onSelectChat(chat)}
        className="p-4 border-b border-gray-700 hover:bg-gray-800 cursor-pointer"
      >
        <div className="font-bold">{chat.name || chat.id?.user || "Unknown"}</div>
        <div className="text-sm text-gray-400">{chat.lastMessage?.body || "No message"}</div>
      </li>
    );
  })}
</ul>

  return (
    <aside className="w-1/3 bg-gray-900 text-white overflow-y-auto border-r border-gray-700">
      <h2 className="p-4 font-bold">Chat List</h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id._serialized}
            onClick={() => onSelectChat(chat)}
            className="p-4 border-b border-gray-700 hover:bg-gray-800 cursor-pointer"
          >
            <div className="font-bold">{chat.name || chat.id.user}</div>
            <div className="text-sm text-gray-400">{chat.lastMessage?.body}</div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
