import { APIEndPoints } from "@/APIEndpoint";
import { IMessage } from "@/interface";
import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";

interface IncomingData {
  status: string;
  message: string;
  data: {
    id: string;
  };
}

interface ChatIncomingData {
  status: string;
  message: string;
  data: {
    id: string;
    messages: IMessage[];
    resolved: boolean;
  };
}

export const chatApi = createApi({
  reducerPath: "ChatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: APIEndPoints.BackendURL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      // const stateAuth = localStorage.getItem("persist:d3-root")
      // console.log(Object.keys(JSON.parse(JSON.stringify(stateAuth))))
      // console.log(state.auth)
      const token = state.auth.token || localStorage.getItem("token") || "";

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createChat: builder.mutation<IncomingData, object>({
      query: (body) => {
        const { ...rest } = body;
        return {
          url: APIEndPoints.create_chat,
          method: "POST",
          body: rest,
        };
      },
    }),

    allChats: builder.query<ChatIncomingData, object>({
      query: (params) => {
        const customParams = { ...params };
        Object.keys(customParams).forEach((key) => {
          if (
            customParams[key as keyof object] === null ||
            customParams[key as keyof object] === undefined ||
            customParams[key as keyof object] === "" ||
            customParams[key as keyof object] === "[]"
          ) {
            delete customParams[key as keyof object];
          }
        });
        return {
          url: APIEndPoints.all_chats,
          method: "GET",
          params: customParams,
        };
      },
    }),

    sendMessage: builder.mutation<IncomingData, object>({
      query: (body) => {
        const { ...rest } = body;
        return {
          url: APIEndPoints.send_message,
          method: "POST",
          body: rest,
        };
      },
      transformResponse(
        Response: unknown,
        meta: FetchBaseQueryMeta | undefined
      ): IncomingData | Promise<IncomingData> {
        if (meta?.response?.headers.get("authorization")) {
          localStorage.setItem(
            "token",
            String(meta?.response?.headers.get("authorization"))
          );
        }
        return Response as IncomingData;
      },
    }),
  }),
});

interface InitialState {
  chatId: string | null;
  count: number | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;

  allMessages: IMessage[];
  chatStatus: "idle" | "loading" | "succeeded" | "failed";
  chatError: string | undefined;
}

const initialState: InitialState = {
  chatId: null,
  count: null,
  status: "idle",
  error: undefined,

  allMessages: [],
  chatStatus: "idle",
  chatError: undefined,
};

export const ChatSlice = createSlice({
  name: "ChatSlice",
  initialState,
  reducers: {
    setChatId: (state, action: PayloadAction<string>) => {
      state.chatId = action.payload;
    },
    addMessage: (state, action: PayloadAction<IMessage>) => {
      const x = new Set<string>();
      const y = state.allMessages;
      y.forEach((i) => x.add(i.sender));

      if (y.length < 2 || x.has(action.payload.sender)) {
        state.allMessages.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(chatApi.endpoints.createChat.matchPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(
        chatApi.endpoints.createChat.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.chatId = action.payload.data.id;
        }
      )
      .addMatcher(
        chatApi.endpoints.createChat.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addMatcher(chatApi.endpoints.allChats.matchPending, (state) => {
        state.chatStatus = "loading";
      })
      .addMatcher(
        chatApi.endpoints.allChats.matchFulfilled,
        (state, action) => {
          state.chatStatus = "succeeded";
          state.allMessages = action.payload.data.messages;
        }
      )
      .addMatcher(chatApi.endpoints.allChats.matchRejected, (state, action) => {
        state.chatStatus = "failed";
        state.chatError = action.error.message;
      });
  },
});

export const {
  useCreateChatMutation,
  useAllChatsQuery,
  useSendMessageMutation,
} = chatApi;
export const { setChatId, addMessage } = ChatSlice.actions;
export default ChatSlice.reducer;
