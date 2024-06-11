import { FaMinus, FaCircle } from "react-icons/fa";
import logo from "/images/Logo.svg";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { IoSend } from "react-icons/io5";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

const ChatArea = ({
  // open,
  setClose,
}: {
  open: boolean;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div
      className={`fixed bottom-8 right-8 w-[20vw] ${
        hasAcceptedTerms ? "h-[85vh]" : "h-[55vh]"
      } bg-lime-50 shadow-lg transition-transform transform rounded-3xl z-50`}
      // style={{ backgroundImage: `url('/images/chat.png')` }}
    >
      <div className="flex items-center justify-between p-4">
        <div>
          <img src={logo} alt="logo" className="max-lg:h-8 h-10 " />
        </div>
        <button
          onClick={() => {
            setClose(false);
            setHasAcceptedTerms(false);
          }}
          className="text-lime-600 hover:text-gray-700 mr-2"
        >
          <FaMinus size={24} className="text-lime-800" />
        </button>
      </div>
      <div
        className={`mx-2 rounded-3xl border-t-2 border-lime-200 bg-[#ffffff] ${
          hasAcceptedTerms ? "h-[75vh]" : "h-96"
        } flex flex-col items-center justify-center`}
      >
        <p className="border-b border-gray-200 h-9 w-full flex items-center justify-center text-xs font-medium tracking-wide text-gray-500">
          By using D3, you agree to our &nbsp;
          <span className="text-blue-800 underline">Priavcy Policy</span>
        </p>
        {!hasAcceptedTerms && (
          <>
            <div className="flex-1 flex items-center justify-center">
              Welcome to D3 Chatbox!
            </div>
            <div className="h-36 border-t border-t-gray-200 bg-gray-50 w-full text-sm p-4 flex flex-col items-center rounded-b-3xl border-b-lime-200 border-b">
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
                className="mt-2 w-fit text-center h-8"
                onClick={() => setHasAcceptedTerms(true)}
              >
                Agree & Continue
              </Button>
            </div>
          </>
        )}
        {hasAcceptedTerms && (
          <>
            <div className="flex-1 flex items-center justify-center">
              Welcome to D3 Chatbox!
            </div>
            <div
              className={`${
                showOptions ? "h-58" : "h-28"
              } border-t border-t-gray-200 bg-white w-full text-sm p-4 flex flex-col justify-between rounded-b-3xl border-b-lime-200 border-b`}
            >
              {showOptions && (
                <div className="flex-1 flex flex-col items-start justify-start -mt-3 mb-5">
                  <span className="flex items-center">
                    <FaCircle size={10} className="text-blue-800" />
                    <Button
                      variant={"link"}
                      className="text-xs rounded-md h-8 text-blue-800 flex items-center justify-start"
                    >
                      Pay & Play
                    </Button>
                  </span>
                  <span className="flex items-center">
                    <FaCircle size={10} className="text-blue-800" />
                    <Button
                      variant={"link"}
                      className="text-xs rounded-md h-8 text-blue-800 flex items-center justify-start"
                    >
                      Membership
                    </Button>
                  </span>
                  <span className="flex items-center">
                    <FaCircle size={10} className="text-blue-800" />
                    <Button
                      variant={"link"}
                      className="text-xs rounded-md h-8 text-blue-800 flex items-center justify-start"
                    >
                      Academy
                    </Button>
                  </span>
                </div>
              )}
              <div
                className="text-xs flex w-full items-center justify-between text-blue-800 mb-2 cursor-pointer"
                onClick={() => {
                  setShowOptions(!showOptions);
                }}
              >
                <span>Choose options</span>
                <span>
                  <MdOutlineKeyboardArrowUp size={20} />
                </span>
              </div>
              <div className="flex items-center bg-gray-100 border border-gray-300 rounded-full h-12">
                <Input
                  placeholder="Ask Me Anything..."
                  className="border-none bg-transparent placeholder:text-gray-400 focus:ring-0 focus:outline-none focus:border-none rounded-full"
                  style={{ boxShadow: "none" }}
                />
                <div
                  className="rounded-full w-12 h-12 mr-2 flex items-center justify-center cursor-pointer"
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
