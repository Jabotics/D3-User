import React, { useState } from "react";
import ChatArea from "../custom/chat/chat-area";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { messageSeen } from "@/store/middleware/util";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

const Chat = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { hasToken } = useAppSelector((state: RootState) => state.auth);
  const { chatId } = useAppSelector((state: RootState) => state.chat);

  const [openChat, setOpenChat] = useState<boolean>(false);
  const [closeChatModalOpen, setCloseChatModalOpen] = useState<boolean>(false);

  const handleClick = () => {
    if (hasToken) {
      if (chatId) {
        dispatch(
          messageSeen({
            // message_id: lastMessageId,
            chat_id: chatId,
          })
        );
      }

      setOpenChat(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <React.Fragment>
      {closeChatModalOpen && (
        <Dialog open={closeChatModalOpen} onOpenChange={setCloseChatModalOpen}>
          <DialogContent>
            <DialogTitle>hey</DialogTitle>
          </DialogContent>
        </Dialog>
      )}
      {!closeChatModalOpen && openChat && (
        <ChatArea
          open={openChat}
          setClose={setOpenChat}
          closeChat={setCloseChatModalOpen}
        />
      )}
      {!closeChatModalOpen && !openChat && (
        <div
          className="w-12 h-12 rounded-2xl fixed bottom-8 right-8 z-50 bg-gradient-to-r from-lime-500 to-green-500 shadow-lg shadow-teal-500/50 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
          onClick={handleClick}
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
