import { APIEndPoints } from "@/APIEndpoint";
import { IBlog, IPopularBlog } from "@/interface/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IncomingData {
  status: string;
  message: string;
  data: {
    count: number;
    blogs: IBlog[];
  };
}

interface PopularBlogIncomingData {
  status: string;
  message: string;
  data: IPopularBlog[];
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
    fetchPopularBlogs: builder.query<PopularBlogIncomingData, void>({
      query: () => {
        return {
          url: APIEndPoints.fetch_popular_blogs,
          method: "GET",
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

  locationArr: string[];

  popularBlogs: IPopularBlog[];
  popularStatus: "idle" | "loading" | "succeeded" | "failed";
  popularError: string | undefined;
}

const initialState: InitialState = {
  blogs: [],
  status: "idle",
  error: undefined,
  count: null,

  limit: 10,
  offset: 0,

  locationArr: ["Home"],

  popularBlogs: [],
  popularStatus: "idle",
  popularError: undefined,
};

export const BlogsSlice = createSlice({
  name: "BlogsSlice",
  initialState,
  reducers: {
    setLocationArr: (state, action: PayloadAction<string>) => {
      const x = new Set(state.locationArr);
      state.locationArr = Array.from(x.add(action.payload));
    },
    resetLocationArr: (state) => {
      state.locationArr = ["Home"];
    },
  },
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
      )
      .addMatcher(blogsApi.endpoints.fetchPopularBlogs.matchPending, (state) => {
        state.popularStatus = "loading";
      })
      .addMatcher(
        blogsApi.endpoints.fetchPopularBlogs.matchFulfilled,
        (state, action) => {
          state.popularStatus = "succeeded";
          state.popularBlogs = action.payload.data;
        }
      )
      .addMatcher(
        blogsApi.endpoints.fetchPopularBlogs.matchRejected,
        (state, action) => {
          state.popularStatus = "failed";
          state.popularError = action.error.message;
        }
      );
  },
});

export const { useFetchBlogsQuery, useFetchPopularBlogsQuery } = blogsApi
export const { setLocationArr, resetLocationArr } = BlogsSlice.actions
export default BlogsSlice.reducer
