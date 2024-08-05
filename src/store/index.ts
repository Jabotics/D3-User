import type {
  Action,
  Dispatch,
  Middleware,
  ThunkAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore } from "redux-persist";

import { socketMiddleware } from "./middleware/socketMiddleware";
import { rootReducer } from "./rootReducer";
import { RequestHandler } from "./RequestHandler";

import {
  authApi,
  logoutApi,

  homeBannerApi,

  bookingApi,
  groundApi,
  promoCodeApi,
  sportApi,
  venueApi,
  citiesApi,
  slotsApi,
  academiesApi,
  eventsApi,
  membershipsApi,
  chatApi,

  contactApi,

  faqsApi,

} from "@/store/actions";

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,

    // @ts-expect-error check this middleware
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware({
        serializableCheck: false,
      }).concat(
        RequestHandler.middleware,

        authApi.middleware,
        logoutApi.middleware,
        
        homeBannerApi.middleware,
        
        groundApi.middleware,
        sportApi.middleware,
        venueApi.middleware,
        
        citiesApi.middleware,
        slotsApi.middleware,
        bookingApi.middleware,
        academiesApi.middleware,
        membershipsApi.middleware,
        eventsApi.middleware,
        promoCodeApi.middleware,
        chatApi.middleware,

        contactApi.middleware,

        faqsApi.middleware,
        
        socketMiddleware,
      );

      const middlewareTuple = middleware as Middleware<
        object,
        RootState,
        Dispatch<UnknownAction>
      >[];
      return middlewareTuple;
    },
    preloadedState,
  });

  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();

export type AppStore = typeof store;

export const persistor = persistStore(store);
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
