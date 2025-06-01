import { useState } from "react";
import ChatList from "../Components/Layout/ChatList";
import ChatWindow from "../Components/Layout/ChatWindow";



export default function MessageUi() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex h-screen">
      <ChatList onSelectChat={setSelectedChat} />
      <ChatWindow selectedChat={selectedChat} />
    </div>
  );
}
