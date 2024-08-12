/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaMinus } from "react-icons/fa";
import logo from "/images/Logo.svg";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { IoSend } from "react-icons/io5";
import Texts from "./texts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
// import { useSendMessageMutation } from "@/store/actions/slices/messageSlice";
import {
  addMessage,
  setChatId,
  useAllChatsQuery,
  useCreateChatMutation,
  useSendMessageMutation,
} from "@/store/actions/slices/chatSlice";
import { createChat, messageSeen, sendMessage } from "@/store/middleware/util";

const ChatArea = ({
  // open,
  setClose,
  closeChat,
}: {
  open: boolean;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  closeChat: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  const { userData } = useAppSelector((state: RootState) => state.auth);

  useAllChatsQuery({ user_id: userData?.id }, { skip: !userData?.id });

  const [create] = useCreateChatMutation();
  const [send] = useSendMessageMutation();

  const [message, setMessage] = useState("");
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  const { chatId, allMessages } = useAppSelector(
    (state: RootState) => state.chat
  );

  async function handleAcceptTerms() {
    if (Array.isArray(allMessages) && allMessages.length > 0) {
      setHasAcceptedTerms(true);
    } else {
      try {
        if (userData && userData.id) {
          const res: any = await create({
            user_id: userData.id,
          }).unwrap();

          dispatch(setChatId(res?.data?.id as string));

          dispatch(createChat());
          setHasAcceptedTerms(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function handleSubmit() {
    const now = new Date();
    try {
      if (userData && userData.id) {
        if (chatId) {
          // if (userData && userData.id && chatId) {
          const res: any = await send({
            text: message,
            // sender_id: userData.id,
            chat_id: chatId,
          }).unwrap();

          dispatch(
            sendMessage({
              text: message,
              chat_id: chatId,
            })
          );

          dispatch(
            addMessage({
              chat_id: chatId,
              message: {
                text: message,
                id: res?.data?.id,
                createdAt: now.toISOString(),
                sender: userData.id,
                seen: false,
              },
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMessage("");
    }
  }

  const handleSeenMessage = () => {
    if (chatId) {
      dispatch(
        messageSeen({
          // message_id: lastMessageId,
          chat_id: chatId,
        })
      );
    }
  };

  return (
    <div
      className={`fixed bottom-0 sm:bottom-8 right-0 sm:right-8 w-screen sm:w-[20rem] ${
        hasAcceptedTerms ? "h-[100%] sm:h-[70vh]" : "h-[100%] sm:h-[55vh]"
      } bg-lime-50 shadow-lg transition-transform transform rounded-none sm:rounded-3xl z-50 overflow-hidden`}
    >
      <div className="flex items-center justify-between px-4 py-2 w-full h-fit sm:p-4">
        <div>
          <img src={logo} alt="logo" className="h-8 " />
        </div>
        <button
          onClick={() => {
            setClose(false);
            setHasAcceptedTerms(false);
          }}
          className="text-lime-600 hover:text-gray-700 mr-2"
        >
          <FaMinus size={16} className="text-lime-800" />
        </button>
      </div>
      <div
        className={`mx-2 h-fit rounded-md sm:rounded-3xl border-t-2 border-lime-200 bg-[#ffffff] ${
          hasAcceptedTerms
            ? "h-[92vh] sm:h-[60vh]"
            : "h-[21rem] xs:h-[27rem] sm:h-[25rem]"
        } flex flex-col items-center justify-center`}
      >
        <p className="border-b border-gray-200 h-5 sm:h-7 w-full flex items-center justify-center text-[8px] sm:text-[10px] font-medium tracking-wide text-gray-500">
          By using D3, you agree to our &nbsp;
          <span className="text-blue-800 underline">Priavcy Policy</span>
        </p>
        {!hasAcceptedTerms ? (
          <>
            <div className="h-[65vh] flex items-center justify-center">
              Welcome to D3 Chatbox!
            </div>
            <div className="h-24 xs:h-28 sm:h-36 border-t border-t-gray-200 bg-gray-50 w-full text-[8px] sm:text-[10px] md:text-[12px] p-4 flex flex-col items-center rounded-b-3xl border-b-lime-200 border-b">
              <span>
                I agree to the &nbsp;
                <span className="text-blue-800 underline">
                  Priavcy Policy
                </span>{" "}
                and I hereby confirm that I am either above 16 years of age or
                have obtained consent from my parents (or guardians) to use D3
                Chatbot.
              </span>
              <Button
                variant={"theme"}
                className="mt-2 w-fit text-center h-6 xs:h-6 sm:h-7 lg:h-7 text-xs sm:text-[12px] lg:text-[14px] lg:mt-4"
                onClick={handleAcceptTerms}
              >
                Agree & Continue
              </Button>
            </div>
          </>
        ) : (
          <>
            <Texts setClose={setClose} closeChat={closeChat} />
            <div
              className={`h-20 border-t border-t-gray-200 bg-white w-full text-sm p-4 flex flex-col justify-between rounded-b-3xl border-b-lime-200 border-b mt-5`}
            >
              <div className="flex items-center bg-gray-100 border border-gray-300 rounded-full h-12">
                <Input
                  placeholder="Ask Me Anything..."
                  className="border-none bg-transparent placeholder:text-gray-400 focus:ring-0 focus:outline-none focus:border-none rounded-full"
                  style={{ boxShadow: "none" }}
                  value={message}
                  onClick={handleSeenMessage}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                />

                <div
                  className="rounded-full w-12 h-12 mr-2 flex items-center justify-center cursor-pointer"
                  onClick={handleSubmit}
                >
                  <IoSend size={20} className="text-black" />
                </div>
              </div>
            </div>
          </>
        )}
        {/*  */}
      </div>
    </div>
  );
};

export default ChatArea;
