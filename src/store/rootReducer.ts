
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

  academiesApi,
  academiesSlice,

  eventsApi,
  eventsSlice

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

const academyPersistConfig = {
  key: 'd3-academies',
  storage,
  version: 1,
  blacklist: ['academies', 'status', 'error', 'count', 'limit', 'offset', 'locationArr', 'selectedSlot']
}

const authPersistedReducer = persistReducer(persistConfig, authSlice)
const otpPersistReducer = persistReducer(otpPersistConfig, otpSlice)

const cityPersistReducer = persistReducer(appPersistConfig, citySlice)
const academyPersistReducer = persistReducer(academyPersistConfig, academiesSlice)

export const rootReducer = combineReducers({

  auth: authPersistedReducer,
  city: cityPersistReducer,
  otp: otpPersistReducer,
  academy: academyPersistReducer,

  ground: GroundSlice,
  sport: SportSlice,
  venue: VenueSlice,
  booking: BookingSlice,

  event: eventsSlice,

  setting: settingSlice,
  
  slots: slotsSlice,
  
  [RequestHandler.reducerPath]: RequestHandler.reducer,
  [groundApi.reducerPath]: groundApi.reducer,
  [sportApi.reducerPath]: sportApi.reducer,
  [venueApi.reducerPath]: venueApi.reducer,
  [bookingApi.reducerPath]: bookingApi.reducer,
  
  // CITY
  [citiesApi.reducerPath]: citiesApi.reducer,

  // SLOTS
  [slotsApi.reducerPath]: slotsApi.reducer,

  // ACADEMIES
  [academiesApi.reducerPath]: academiesApi.reducer,

  // EVENTS
  [eventsApi.reducerPath]: eventsApi.reducer,

})
