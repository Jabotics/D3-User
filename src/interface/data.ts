export interface IGround {
  id: string;
  venue: {
    _id: string;
    name: string;
    address: string;
  };
  name: string;
  dimensions: {
    boundary_type: string;
    length: string;
    width: string;
  };
  supported_sports: [
    {
      _id: string;
      name: string;
    },
    {
      _id: string;
      name: string;
    }
  ];
  rules: [];
  city: {
    _id: string;
    name: string;
  };
  images: string[];
}
export interface ISport {
  id: string,
  name: string
}
export interface IVenue {
  id: string,
  name: string
}

export interface ISlot {
  id: string;
  slot: string;
  price: number;
  available: boolean;
}

export interface ICity {
  id: string;
  name: string;
}

export interface IBooking {
  id: string
  customer: {
    _id: string
    name: string
    mobile: string
  },
  city: {
    _id: string
    name: string
  },
  venue: {
    _id: string
    name: string
    address: string
  },
  ground: {
    _id: string
    name: string
    supported_sports: [
      {
        _id: string
        name: string
      },
      {
        _id: string
        name: string
      }
    ]
  },
  booking_status: string
  date: string
  slots: [
    {
      _id: string
      slot: string
    }
  ]
}

export interface IPromo {
  id: string
  code: string
  minimum_amount: number
  discount_amount: number
  discount_percentage: number
  max_use_limit: string,
  valid_upto: string
  terms_and_conditions: string[]
}
