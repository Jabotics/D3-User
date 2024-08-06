/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import type { Middleware } from "redux";
import { APIEndPoints } from "@/APIEndpoint"; // Adjust path as per your configuration
import { createChat, messageSeen, sendMessage, solveChat } from "./util";
import {
  addMessage,
  clearChat,
  setQueryResponse,
} from "../actions/slices/chatSlice";

// Initialize Socket.io connection
export const socket: Socket = io(APIEndPoints.BackendURL, {
  transports: ["websocket", "polling", "flashsocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});

export const socketMiddleware: Middleware = (store) => {
  // Handle initial connection and emit 'client_ready'
  const handleConnect = () => {
    const auth = localStorage.getItem("persist:d3-root");
    if (auth) {
      const userData = JSON.parse(auth);
      const userId = JSON.parse(userData?.["userData"])?.["id"];
      if (userId) {
        socket.emit("client_ready", {
          user: userId,
          socket: socket.id,
        });
      } else {
        console.warn("userId is undefined or null.");
      }
    }
  };

  // Attach connect event listener
  socket.on("connect", handleConnect);

  // Listen for incoming events
  socket.onAny((event, ...args) => {
    switch (event) {
      case "message": {
        const [data] = args;
        console.log("a", data);
        store.dispatch(addMessage(data));
        if (data.message.text === "Is Your Query Solved?") {
          store.dispatch(setQueryResponse(false));
        }
        break;
      }

      case "chatSolved": {
        const [data] = args;
        console.log("b", data);
        store.dispatch(clearChat({ chatId: data }));
        break;
      }

      case "chatJoined":
        {
          const [data] = args;
          console.log("c", data);
        }
        break;

      default:
        break;
    }
  });

  // Clean up listeners on middleware teardown
  const cleanupListeners = () => {
    socket.off("connect", handleConnect);
    socket.offAny();
  };

  return (next) => (action: any) => {
    switch (action.type) {
      case sendMessage.type:
        socket.emit("sendMessage", {
          ...action.payload,
          socket_id: socket.id,
        });
        break;

      case messageSeen.type:
        socket.emit("messageSeen", {
          ...action.payload,
          socket_id: socket.id,
        });
        break;

      case createChat.type:
        socket.emit("createChat", { socket_id: socket.id });
        break;

      case solveChat.type:
        socket.emit("solveChat", {
          ...action.payload,
          socket_id: socket.id,
        });
        break;

      default:
        break;
    }

    // Call cleanupListeners when middleware is no longer used
    if (action.type === "@@redux/INIT") {
      // Example: use a specific action type or condition to trigger cleanup
      cleanupListeners();
    }

    return next(action);
  };
};
