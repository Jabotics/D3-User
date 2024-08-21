export const APIEndPoints = {
  BackendURL: 'http://15.207.239.105:5050' ,
  // BackendURL: 'http://192.168.29.16:5050',

  // CUSTOMER
  customer_login: '/api/customer-login',
  validate_otp: '/api/validate-otp',
  verify_session: '/api/verify-user-session',
  logout: '/api/logout',

  update_profile: '/api/update-user-profile',

  // Fetch Ground
  fetch_ground: '/api/grounds',

  // fetch Sports
  fetch_sport: '/api/sports',

  // fetch venue
  fetch_venue: '/api/venues',

  // CITY
  fetch_cities: '/api/fetch-cities',

  // HOMEPAGE BANNER
  fetch_banner: '/api/banners',

  // SLOTS
  get_slot: '/api/get-available-booking-slots',
  book_slot: '/api/book-slot',

  // Booking
  get_booking: '/api/my-bookings',

  // GROUNDS
  fetch_grounds: '/api/fetch-grounds',
  favorite_ground: '/api/favorites',

  // ACADEMIES
  fetch_academies: '/api/academies',
  join_academy: '/api/join-academy',
  my_academy: '/api/joined-academies',

  // MEMBERSIPS
  fetch_memberships: '/api/memberships',
  join_membership: '/api/join-membership',
  my_memberships: '/api/joined-memberships',

  // EVENTS
  fetch_events: '/api/fetch-events',
  add_event_request: '/api/add-event-request',
  // Promocode
  fetch_promo: '/api/promo-codes',
  apply_promo: '/api/apply-promo',

  // CHAT
  create_chat: '/api/create-chat',
  all_chats: '/api/chat',
  send_message: '/api/send-message',
  update_chat: '/api/update-chat',
  all_messages: '/api/get-messages',

  // CONTACT
  submit_inquiry: '/api/add-inquiry',

  // FAQ
  fetch_faqs: '/api/faqs',

  // BLOGS
  fetch_blogs: '/api/blogs',
  fetch_popular_blogs: '/api/popular-blogs',

  // FEEDBACK
  feedback: '/api/feedback',

  // HAPPY CUSTOMERS
  happy_customers: '/api/happy-customers',
}