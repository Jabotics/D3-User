import storage from 'redux-persist/lib/storage'

import {
  // AUTHENTICATION
  authSlice,
  otpSlice,
 
} from '@/store/actions'
import { RequestHandler } from './RequestHandler'

import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'

const persistConfig = {
  key: 'd3-root',
  storage,
  version: 1,
}

const otpPersistConfig = {
  key: 'd3-otp-verify',
  storage,
  version: 1,
}

const authPersistedReducer = persistReducer(persistConfig, authSlice)
const otpPersistReducer = persistReducer(otpPersistConfig, otpSlice)

export const rootReducer = combineReducers({
  auth: authPersistedReducer,
  otp: otpPersistReducer,
  
  [RequestHandler.reducerPath]: RequestHandler.reducer,
  
})
