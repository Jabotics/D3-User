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

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,

    // @ts-expect-error check this middleware
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware({
        serializableCheck: false,
      }).concat(
        socketMiddleware,
        RequestHandler.middleware
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

export const store = makeStore()

export type AppStore = typeof store

export const persistor = persistStore(store)
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>