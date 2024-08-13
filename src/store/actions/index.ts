import  PromoSlice , { promoCodeApi} from './slices/promoSlice';
import BookingSlice, { bookingApi } from './slices/bookingSlice';
import VenueSlice, { venueApi } from './slices/venueSlice';
import SportSlice, { sportApi } from './slices/sportSlice';
import GroundSlice, { groundApi } from './slices/groundSlice';
import authSlice, { authApi } from "./slices/authSlice";
import otpSlice, { logoutApi } from "./slices/otpSlice";

import settingSlice from "./slices/settingSlice";

import citySlice, { citiesApi } from "./slices/citySlice";
import slotsSlice, { slotsApi } from "./slices/slotsSlice";
import eventsSlice, { eventsApi } from "./slices/eventSlice";
import academiesSlice, { academiesApi } from "./slices/academySlice";
import membershipsSlice, { membershipsApi } from "./slices/membershipSlice";
import homeBannerSlice, { homeBannerApi } from "./slices/bannerSlice";

import profileSlice from './slices/profileSlice';

import chatSlice, { chatApi } from './slices/chatSlice';
import { contactApi } from './slices/contactSlice'
import { reviewApi } from './slices/reviewSlice'

import faqsSlice, { faqsApi } from './slices/faqSlice'
import blogsSlice, { blogsApi } from './slices/blogSlice'
import happyCustomersSlice, { happyCustomersApi } from './slices/happyCustomerSlice'

export {
  authSlice,
  authApi,
  logoutApi,
  
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

  academiesSlice,
  academiesApi,

  membershipsSlice,
  membershipsApi,

  homeBannerSlice,
  homeBannerApi,

  eventsSlice,
  eventsApi,
  promoCodeApi,
  PromoSlice,

  profileSlice,
  
  chatApi,
  chatSlice,

  contactApi,

  reviewApi,

  faqsSlice,
  faqsApi,

  blogsApi,
  blogsSlice,
  
  happyCustomersSlice,
  happyCustomersApi,
}