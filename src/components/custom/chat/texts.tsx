import { RootState } from "@/store";
import { useAllChatsQuery } from "@/store/actions/slices/chatSlice";
// import { useGetMessagesQuery } from "@/store/actions/slices/messageSlice";
import { useAppSelector } from "@/store/hooks";
import { 
  useEffect, 
  useRef, 
  // useState 
} from "react";

const Texts = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // const [toFetch, setToFetch] = useState(false)
  const { userData } = useAppSelector((state: RootState) => state.auth);

  const chatsQuery = useAllChatsQuery({ user_id: userData?.id }, { skip: !userData?.id });

  const { allMessages } = useAppSelector((state: RootState) => state.chat);
  // useGetMessagesQuery({ chat_id: chatId }, { skip: !chatId });

  // const { allMessages } = useAppSelector((state: RootState) => state.message);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
    <div className="flex-1 w-full flex items-center justify-center overflow-x-hidden overflow-y-auto scroll-nobg">
      {allMessages && allMessages.length > 0 ? (
        <div className="w-full h-full flex flex-col gap-2 px-5">
          {allMessages.map((item, index) => {
            return (
              <div
                key={index}
                ref={messagesEndRef}
                className={`w-full overflow-hidden h-fit shrink-0 flex items-center ${
                  item.sender === userData?.id ? "justify-end" : "justify-start"
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
          })}
        </div>
      ) : (
        <div>Welcome to D3 Chatbox!</div>
      )}
    </div>
  );
};

export default Texts;
