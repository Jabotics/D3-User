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
  // verifySession,
} from "./util";

// import { setAuth } from '../actions/slices/authSlice'
// import { addMessage, setMessage } from '../actions/slices/messageSlice'
import { addMessage } from "../actions/slices/chatSlice";

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
      socket.emit("client_ready", {
        user: userId,
        socket: socket.id,
      });
    }
  });

  // Listen for any event
  socket.onAny((event, ...args) => {
    switch (event) {
      // case 'getUserData':
      //   {
      //     // const [data] = args
      //     // console.log('UPDATE PROFILE: ', data)
      //     // store.dispatch(setAuth({ userData: data }))
      //     // store.dispatch(setHasUpdated(true))
      //   }
      //   break

      case "message":
        {
          const [data] = args;
          // console.log(data)
          store.dispatch(addMessage(data));
        }
        break;

      // case 'allMessages':
      //   {
      //     const [data] = args
      //     store.dispatch(setMessage(data))
      //   }
      //   break
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
          socket.emit("createChat", { socket_id: socket.id })
        }
        break

      // case joinChat.type:
      //   {
      //     socket.emit('joinChat', { ...action.payload, socket_id: socket.id })
      //   }
      //   break

      // case verifySession.type:
      //   {
      //     socket.emit('verifySession', { ...action.payload, socket_id: socket.id })
      //   }
      //   break
    }

    return next(action);
  };
};
