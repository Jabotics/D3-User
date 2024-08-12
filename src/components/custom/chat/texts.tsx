/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMessage } from "@/interface";
import { RootState } from "@/store";
import {
  addMessage,
  clearChat,
  setChatId,
  setQueryResponse,
  useAllChatsQuery,
  useSendMessageMutation,
  useUpdateMessageMutation,
} from "@/store/actions/slices/chatSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { messageSeen, sendMessage, solveChat } from "@/store/middleware/util";
import {
  useEffect,
  useRef,
  // useState
} from "react";

function findLastIndexWithValue(
  arr: IMessage[],
  value: string,
  key: keyof IMessage
) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i][key] === value) {
      return i;
    }
  }
  return -1;
}

const Texts = ({
  setClose,
  closeChat,
}: {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  closeChat: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  const [send] = useSendMessageMutation();
  const [update] = useUpdateMessageMutation();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { userData } = useAppSelector((state: RootState) => state.auth);

  const chatsQuery = useAllChatsQuery(
    { user_id: userData?.id },
    { skip: !userData?.id }
  );

  const { allMessages, chatId, queryMsgResponse } = useAppSelector(
    (state: RootState) => state.chat
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  async function handleUpdateChat(chat_status: "Solved") {
    const now = new Date();
    const lastMessageId = allMessages[allMessages.length - 1].id;

    try {
      if (chatId) {
        await update({
          chat_id: chatId,
          chat_status,
        });

        dispatch(
          messageSeen({
            message_id: lastMessageId,
            chat_id: chatId,
          })
        );

        try {
          if (userData && userData.id) {
            const res: any = await send({
              text: "Yes",
              // sender_id: userData.id,
              chat_id: chatId,
            }).unwrap();

            dispatch(
              sendMessage({
                text: "Yes",
                chat_id: chatId,
              })
            );

            dispatch(
              addMessage({
                chat_id: chatId,
                message: {
                  text: "Yes",
                  id: res?.data?.id,
                  createdAt: now.toISOString(),
                  sender: userData.id,
                  seen: false,
                },
              })
            );
          }
        } catch (error) {
          console.log(error);
        }

        dispatch(
          solveChat({
            chat_id: chatId,
          })
        );
        dispatch(clearChat({ chatId }));
        dispatch(setQueryResponse(true));
        dispatch(setChatId(null));

        setClose(false);
        closeChat(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function queryNotSolved() {
    const now = new Date();
    try {
      if (userData && userData.id) {
        if (chatId) {
          // if (userData && userData.id && chatId) {
          const res: any = await send({
            text: "No",
            // sender_id: userData.id,
            chat_id: chatId,
          }).unwrap();

          dispatch(
            sendMessage({
              text: "No",
              chat_id: chatId,
            })
          );

          dispatch(
            addMessage({
              chat_id: chatId,
                message: {
                  text: "No",
                  id: res?.data?.id,
                  createdAt: now.toISOString(),
                  sender: userData.id,
                  seen: false,
                },
            })
          );

          dispatch(setQueryResponse(true));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  useEffect(() => {
    const x = setTimeout(() => {
      chatsQuery.refetch();
    }, 1500);

    return () => clearTimeout(x);
  }, []);

  return (
    <div className="h-[65vh] w-full flex items-center justify-center overflow-x-hidden overflow-y-auto scroll-nobg">
      {allMessages && allMessages.length > 0 ? (
        <div className="w-full h-full flex flex-col gap-2 px-5">
          {allMessages.map((item, index) => {
            const lastQueryIndex = findLastIndexWithValue(
              allMessages,
              "Is Your Query Solved?",
              "text"
            );
            if (item.text === "Is Your Query Solved?") {
              return (
                <div
                  key={index}
                  className={`flex flex-col gap-2 w-full ${
                    index === 0 && "mt-10"
                  } ${index === allMessages.length - 1 && "mb-10"}`}
                >
                  <div
                    ref={messagesEndRef}
                    className={`w-full overflow-hidden h-fit shrink-0 flex items-center ${
                      item.sender === userData?.id
                        ? "justify-end"
                        : "justify-start"
                    } `}
                  >
                    <p
                      className={`text-sm rounded-xl ${
                        item.sender === userData?.id
                          ? "bg-gray-200 pl-5 pr-3"
                          : "border border-[#51a73c] text-gray-600 pr-5 pl-3 "
                      }`}
                    >
                      {item.text}
                    </p>
                  </div>
                  {!queryMsgResponse && lastQueryIndex === index && (
                    <div className="flex items-center gap-5 w-full justify-center">
                      <p
                        className="bg-[#51a73c] px-10 text-gray-100 cursor-pointer py-1 h-fit text-sm rounded-md"
                        onClick={() => {
                          handleUpdateChat("Solved");
                        }}
                      >
                        Yes
                      </p>
                      <p
                        className="bg-[#51a73c] px-10 text-gray-100 cursor-pointer py-1 h-fit text-sm rounded-md"
                        onClick={() => {
                          queryNotSolved();
                        }}
                      >
                        No
                      </p>
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  ref={messagesEndRef}
                  className={`w-full overflow-hidden h-fit shrink-0 flex items-center ${
                    item.sender === userData?.id
                      ? "justify-end"
                      : "justify-start"
                  } ${index === 0 && "mt-10"} ${
                    index === allMessages.length - 1 && "mb-10"
                  }`}
                >
                  <p
                    className={` py-1 text-sm rounded-xl ${
                      item.sender === userData?.id
                        ? "bg-gray-200 pl-5 pr-3"
                        : "border border-[#51a73c] text-gray-600 pr-5 pl-3 "
                    }`}
                  >
                    {item.text}
                  </p>
                </div>
              );
            }
          })}
        </div>
      ) : (
        <div>Welcome to D3 Chatbox!</div>
      )}
    </div>
  );
};

export default Texts;
