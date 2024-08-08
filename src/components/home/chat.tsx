import React, { useState } from "react";
import ChatArea from "../custom/chat/chat-area";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { messageSeen } from "@/store/middleware/util";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";

import { FaRegEdit } from "react-icons/fa";
import { Button } from "../ui/button";

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
          <DialogContent className="w-[90%] md:w-full rounded-md">
            <DialogTitle>Thanks to have a Chat with us!</DialogTitle>
            <DialogDescription className="sr-only">
              Customer Review
            </DialogDescription>
            <Separator />
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <p className="text-sm text-gray-400 font-medium tracking-wide">
                  Hope your queries are resolved.
                </p>
                <p>Share your review to help us improve.</p>
              </div>

              <Link
                to={"/contact/customer-review"}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => {
                  setCloseChatModalOpen(false);
                }}
              >
                <Button
                  variant={"default"}
                  className="w-full bg-black text-gray-100  px-5 py-3 rounded-md mt-5 flex flex-col"
                >
                  <div className={`flex items-start gap-2`}>
                    <FaRegEdit size={25} />
                    <p className="text-lg font-medium">Write a Review</p>
                  </div>
                </Button>
              </Link>
            </div>
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
