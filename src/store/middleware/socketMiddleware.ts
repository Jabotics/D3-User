import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";

import type { Middleware } from "redux";
import { APIEndPoints } from "@/APIEndpoint";

import {
  createChat,
  messageSeen,
  // joinChat,
  // socketListeners,
  sendMessage,
  solveChat,
  // verifySession,
} from "./util";

// import { setAuth } from '../actions/slices/authSlice'
// import { addMessage, setMessage } from '../actions/slices/messageSlice'
import { addMessage, clearChat, setQueryResponse } from "../actions/slices/chatSlice";

// let socket: Socket

export const socket: Socket = io(APIEndPoints.BackendURL, {
  transports: ["websocket", "polling", "flashsocket"],
});

export const socketMiddleware: Middleware = (store) => {
  socket.on("connect", () => {
    const auth = localStorage.getItem("persist:d3-root");
    if (auth) {
      const userData = JSON.parse(auth);
      const userId = JSON.parse(userData?.["userData"])?.["id"];
      if (userId && socket.id) {
        socket.emit("client_ready", {
          user: userId,
          socket: socket.id,
        });
      } else {
        console.warn("userId or socket.id is undefined or null.");
      }
    }
  });

  // Listen for any event
  socket.onAny((event, ...args) => {
    switch (event) {

      case "message":
        {
          const [data] = args;
          console.log(data)
          store.dispatch(addMessage(data));
          if(data.message.text === 'Is Your Query Solved?') {
            store.dispatch(setQueryResponse(false))
          }
        }
        break;

      case "chatSolved":
        {
          const [data] = args;
          // console.log(data)
          store.dispatch(clearChat({ chatId: data }))
        }

      
    }
  });

  return (next) => (action: any) => {
    switch (action.type) {
      case sendMessage.type:
        {
          socket.emit("sendMessage", {
            ...action.payload,
            socket_id: socket.id,
          });
        }
        break;

      case messageSeen.type:
        {
          socket.emit("messageSeen", {
            ...action.payload,
            socket_id: socket.id,
          });
        }
        break;

      case createChat.type:
        {
          socket.emit("createChat", { socket_id: socket.id });
        }
        break;

      case solveChat.type:
          {
            socket.emit('solveChat', {
              ...action.payload,
              socket_id: socket.id,
            })
          }
          break
    }

    return next(action);
  };
};
