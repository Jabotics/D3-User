import React, { useState } from "react";
import ChatArea from "../custom/chat/chat-area";

const Chat = () => {
  const [openChat, setOpenChat] = useState(false);
  return (
    <React.Fragment>
      {openChat && (
        <ChatArea open={openChat} setClose={setOpenChat} />
      )}
      {!openChat && (
        <div
          className="w-12 h-12 rounded-2xl fixed bottom-8 right-8 z-50 bg-gradient-to-r from-lime-500 to-green-500 shadow-lg shadow-teal-500/50 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
          onClick={() => {
            setOpenChat(true);
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white opacity-20 rounded-full"></div>
            <img src="/logo.png" alt="chat" className="w-6 h-6 relative z-10" />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Chat;
