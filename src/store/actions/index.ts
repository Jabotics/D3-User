import  PromoSlice , { promoCodeApi} from './slices/promoSlice';
import BookingSlice, { bookingApi } from './slices/bookingSlice';
import VenueSlice, { venueApi } from './slices/venueSlice';
import SportSlice, { sportApi } from './slices/sportSlice';
import GroundSlice, { groundApi } from './slices/groundSlice';
import authSlice from "./slices/authSlice";
import otpSlice from "./slices/otpSlice";

import settingSlice from "./slices/settingSlice";

import citySlice, { citiesApi } from "./slices/citySlice";
import slotsSlice, { slotsApi } from "./slices/slotsSlice";

export {
  authSlice,
  otpSlice,
  GroundSlice,
  groundApi,
  SportSlice,
  sportApi,
  VenueSlice,
  venueApi,

  settingSlice,

  citiesApi,
  citySlice,
  slotsSlice,
  slotsApi,
  bookingApi,
  BookingSlice,
  promoCodeApi,
  PromoSlice,
}