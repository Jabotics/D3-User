export const APIEndPoints = {
  BackendURL: 'http://192.168.29.16:5050',

  // CUSTOMER
  customer_login: '/api/customer-login',
  validate_otp: '/api/validate-otp',

  // Fetch Ground
  fetch_ground: '/api/grounds',

  // fetch Sports
  fetch_sport: '/api/sports',

  // fetch venue
  fetch_venue: '/api/venues',
  // CITY
  fetch_cities: '/api/fetch-cities',

  // SLOTS
  get_slot: '/api/get-available-booking-slots',
  book_slot: '/api/book-slot',

  // Booking
  get_booking: '/api/get-slot-bookings',

  // GROUNDS
  fetch_grounds: '/api/fetch-grounds',

  // ACADEMIES
  fetch_academies: '/api/academies',
  join_academy: '/api/join-academy',

  // EVENTS
  fetch_events: '/api/fetch-events',
  
  // Promocode
  fetch_promo: '/api/promo-codes',
  apply_promo: '/api/apply-promo'
}