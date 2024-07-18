import React, { useEffect, useState } from "react";
import ChatArea from "../custom/chat/chat-area";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { messageSeen } from "@/store/middleware/util";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";

import { FaRegEdit } from "react-icons/fa";
import { motion } from "framer-motion";

import { FaStar } from "react-icons/fa6";
import { Textarea } from "../ui/textarea";

const initialRating = 0
const Chat = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { hasToken } = useAppSelector((state: RootState) => state.auth);
  const { chatId } = useAppSelector((state: RootState) => state.chat);

  const [openChat, setOpenChat] = useState<boolean>(false);
  const [closeChatModalOpen, setCloseChatModalOpen] = useState<boolean>(false);

  const [rating, setRating] = useState(initialRating);
  const [hasClickedARating, setHasClickedARating] = useState(false)

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

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

  useEffect(() => {
    if (!hasClickedARating) {
      const interval = setInterval(() => {
        setRating((prevRating) => (prevRating < 5 ? prevRating + 1 : 0));
      }, 200);
  
      return () => clearInterval(interval);
    }
  }, [hasClickedARating]);

  return (
    <React.Fragment>
      {closeChatModalOpen && (
        <Dialog open={closeChatModalOpen} onOpenChange={setCloseChatModalOpen}>
          <DialogContent>
            <DialogTitle>Thanks to have a Chat with us!</DialogTitle>
            <Separator />
            <div className="flex flex-col gap-2">
              <div className="text-sm text-gray-500 font-semibold tracking-wide">
                Hope your queries are resolved.
              </div>

              <div className="w-full min-h-[20vh] max-h-[45vh] mt-5 flex flex-col">
                <div className={`flex items-start gap-2 ${hasClickedARating && 'mb-4'}`}>
                  <FaRegEdit size={25} />
                  <p className="text-lg font-medium">Write a Review</p>
                </div>

                <div className={`flex-1 flex flex-col ${hasClickedARating ? 'items-start justify-start' : 'items-center justify-center'}`}>
                  <div className={`flex w-full gap-2 ${hasClickedARating ? 'items-start justify-start' :'items-center justify-center'} transition-all duration-500`}>
                    {[1, 2, 3, 4, 5].map((index) => (
                      <motion.span
                        key={index}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => {
                          setHasClickedARating(true)
                          handleRatingChange(index)
                        }}
                        style={{
                          cursor: "pointer",
                          color: index <= rating ? "#FFD700" : "#C0C0C0",
                        }}
                      >
                        <FaStar size={hasClickedARating ? 25 : 75} />
                      </motion.span>
                    ))}
                  </div>

                  {hasClickedARating && <div className="h-[20vh] w-full mt-5">
                      <Textarea placeholder="Write a Review ..." className="min-h-[15vh] max-h-full w-full px-5"></Textarea>
                    </div>}
                </div>
              </div>
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
