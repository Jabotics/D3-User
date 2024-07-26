
import storage from 'redux-persist/lib/storage'

import {
  GroundSlice,
  // AUTHENTICATION
  authSlice,
  authApi,
  logoutApi,

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

  academiesApi,
  academiesSlice,

  membershipsApi,
  membershipsSlice,

  homeBannerApi,
  homeBannerSlice,

  eventsApi,
  eventsSlice,
  profileSlice,

  chatSlice,
  chatApi,

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

const profilePersistConfig = {
  key: 'd3-profile',
  storage,
  version: 1,
}

const academyPersistConfig = {
  key: 'd3-academies',
  storage,
  version: 1,
  blacklist: ['academies', 'status', 'error', 'count', 'limit', 'offset', 'locationArr', 'selectedSlot']
}

const membershipPersistConfig = {
  key: 'd3-memberships',
  storage,
  version: 1,
  blacklist: ['memberships', 'status', 'error', 'count', 'limit', 'offset', 'locationArr', 'selectedSlot']
}

const chatPersistConfig = {
  key: 'd3-chats',
  storage,
  version: 1,
  blacklist: ['allMessages', 'status', 'error', 'count', 'chatStatus', 'chatError']
}

const authPersistedReducer = persistReducer(persistConfig, authSlice)
const otpPersistReducer = persistReducer(otpPersistConfig, otpSlice)

const cityPersistReducer = persistReducer(appPersistConfig, citySlice)
const profilePersistReducer = persistReducer(profilePersistConfig, profileSlice)
const academyPersistReducer = persistReducer(academyPersistConfig, academiesSlice)
const membershipPersistReducer = persistReducer(membershipPersistConfig, membershipsSlice)

const chatsPersistReducer = persistReducer(chatPersistConfig, chatSlice)

export const rootReducer = combineReducers({

  auth: authPersistedReducer,
  city: cityPersistReducer,
  otp: otpPersistReducer,

  banner: homeBannerSlice,

  academy: academyPersistReducer,
  membership: membershipPersistReducer,

  ground: GroundSlice,
  sport: SportSlice,
  venue: VenueSlice,
  booking: BookingSlice,
  setting: settingSlice,
  promocode: PromoSlice,
  
  event: eventsSlice,
  
  slots: slotsSlice,
  profile: profilePersistReducer,

  chat: chatsPersistReducer,
  
  [RequestHandler.reducerPath]: RequestHandler.reducer,

  [authApi.reducerPath]: authApi.reducer,
  [logoutApi.reducerPath]: logoutApi.reducer,
  
  [homeBannerApi.reducerPath]: homeBannerApi.reducer,
  [groundApi.reducerPath]: groundApi.reducer,
  [sportApi.reducerPath]: sportApi.reducer,
  [venueApi.reducerPath]: venueApi.reducer,
  [bookingApi.reducerPath]: bookingApi.reducer,
  [promoCodeApi.reducerPath]: promoCodeApi.reducer,
  
  // CITY
  [citiesApi.reducerPath]: citiesApi.reducer,

  // SLOTS
  [slotsApi.reducerPath]: slotsApi.reducer,

  // ACADEMIES
  [academiesApi.reducerPath]: academiesApi.reducer,

  // MEMBERSHIPS
  [membershipsApi.reducerPath]: membershipsApi.reducer,

  // EVENTS
  [eventsApi.reducerPath]: eventsApi.reducer,

  // CHAT
  [chatApi.reducerPath]: chatApi.reducer,

})
