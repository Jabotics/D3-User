import storage from 'redux-persist/lib/storage'

import {
  // AUTHENTICATION
  authSlice,
 
} from '@/store/actions'
import { RequestHandler } from './RequestHandler'

import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'

const persistConfig = {
  key: 'd3-root',
  storage,
  version: 1,
}

const authPersistedReducer = persistReducer(persistConfig, authSlice)

export const rootReducer = combineReducers({
  auth: authPersistedReducer,
  [RequestHandler.reducerPath]: RequestHandler.reducer,
  
})
