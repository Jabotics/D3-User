import storage from 'redux-persist/lib/storage'

import {
  // AUTHENTICATION
  authSlice,
  otpSlice,

  settingSlice,

  citySlice,
  citiesApi,
  slotsSlice,
  slotsApi,
 
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

const appPersistConfig = {
  key: 'd3-app',
  storage,
  version: 1,
}

const authPersistedReducer = persistReducer(persistConfig, authSlice)
const otpPersistReducer = persistReducer(otpPersistConfig, otpSlice)

const cityPersistReducer = persistReducer(appPersistConfig, citySlice)

export const rootReducer = combineReducers({
  auth: authPersistedReducer,
  otp: otpPersistReducer,

  setting: settingSlice,
  
  city: cityPersistReducer,
  slots: slotsSlice,
  
  [RequestHandler.reducerPath]: RequestHandler.reducer,

  // CITY
  [citiesApi.reducerPath]: citiesApi.reducer,

  // SLOTS
  [slotsApi.reducerPath]: slotsApi.reducer,
  
})
