import { APIEndPoints } from "@/APIEndpoint";
import { IBlog } from "@/interface/data";
import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IncomingData {
  status: string;
  message: string;
  data: {
    count: number;
    blogs: IBlog[];
  };
}

export const blogsApi = createApi({
  reducerPath: "BlogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: APIEndPoints.BackendURL,
  }),
  endpoints: (builder) => ({
    fetchBlogs: builder.query<IncomingData, object>({
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
          url: APIEndPoints.fetch_blogs,
          method: "GET",
          params: customParams,
        };
      },
    }),
  }),
});

interface InitialState {
  blogs: IBlog[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  count: number | null;

  limit: number;
  offset: number;
}

const initialState: InitialState = {
  blogs: [],
  status: "idle",
  error: undefined,
  count: null,

  limit: 10,
  offset: 0,
};

export const BlogsSlice = createSlice({
  name: "BlogsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle the asynchronous fetchItems action
    builder
      .addMatcher(blogsApi.endpoints.fetchBlogs.matchPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(
        blogsApi.endpoints.fetchBlogs.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.blogs = action.payload.data.blogs;
          state.count = action.payload.data.count;
        }
      )
      .addMatcher(
        blogsApi.endpoints.fetchBlogs.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const { useFetchBlogsQuery } = blogsApi
export default BlogsSlice.reducer
