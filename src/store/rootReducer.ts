
import storage from 'redux-persist/lib/storage'

import {
  GroundSlice,
  // AUTHENTICATION
  authSlice,
  otpSlice,
  groundApi,
  SportSlice,
  sportApi,
  VenueSlice,
  venueApi,
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
  [RequestHandler.reducerPath]: RequestHandler.reducer,
  auth: authPersistedReducer,
  otp: otpPersistReducer,
  ground: GroundSlice,
  [groundApi.reducerPath]: groundApi.reducer,
  sport: SportSlice,
  [sportApi.reducerPath]: sportApi.reducer,
  venue: VenueSlice,
  [venueApi.reducerPath]: venueApi.reducer,
})
