
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

  settingSlice,

  citySlice,
  citiesApi,
  slotsSlice,
  slotsApi,
  bookingApi,
  BookingSlice,
  promoCodeApi,
  PromoSlice,

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
  ground: GroundSlice,
  [groundApi.reducerPath]: groundApi.reducer,
  sport: SportSlice,
  [sportApi.reducerPath]: sportApi.reducer,
  venue: VenueSlice,
  [venueApi.reducerPath]: venueApi.reducer,
  booking: BookingSlice,
  [bookingApi.reducerPath]: bookingApi.reducer,
  setting: settingSlice,
  [promoCodeApi.reducerPath]: promoCodeApi.reducer,
  promocode: PromoSlice,

  city: cityPersistReducer,
  slots: slotsSlice,

  [RequestHandler.reducerPath]: RequestHandler.reducer,

  // CITY
  [citiesApi.reducerPath]: citiesApi.reducer,

  // SLOTS
  [slotsApi.reducerPath]: slotsApi.reducer,

})
