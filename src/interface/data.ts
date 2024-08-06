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
  rules: {
    allowed: string[];
    not_allowed: string[];
  };
  city: {
    _id: string;
    name: string;
  };
  images: string[];
  video: string;
  amenities: string[];
}

export interface ISport {
  id: string;
  name: string;
  icon?: string;
}

export interface IVenue {
  id: string;
  name: string;
}

export interface ISlot {
  id: string;
  slot: string;
  price: {
    [key in "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat"]: number;
  };
  available: boolean;
}

export type DayOfWeek = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
export interface ICity {
  id: string;
  name: string;
}

export interface IBooking {
  id: string;
  customer: {
    _id: string;
    name: string;
    mobile: string;
  };
  city: {
    _id: string;
    name: string;
  };
  venue: {
    _id: string;
    name: string;
    address: string;
  };
  ground: {
    _id: string;
    name: string;
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
  };
  booking_status: string;
  date: string;
  slots: [
    {
      _id: string;
      slot: string;
    }
  ];
}

export interface IAcademy {
  id: string;
  name: string;
  description: string;
  admission_fees: number;
  monthly_fee: number;
  quarterly_fee: number;
  half_yearly_fee: number;
  yearly_fee: number;
  ground: {
    _id: string;
    venue: {
      _id: string;
      name: string;
    };
    name: string;
  };
  sport: {
    _id: string;
    name: string;
  };
  slots: {
    morning: {
      _id: string;
      slot: string;
    }[];
    evening: {
      _id: string;
      slot: string;
    }[];
  };
  is_active: boolean;
  images?: string[];
  video: string;
  active_days: string[];
}

export interface IJoinedAcademy {
  id: string;
  student_id: string;
  academy: string;
  ground: string;
  venue: string;
  shift: string;
  "re-admission_required": boolean;
  last_payment_date: string;
  payment_due_date: string;
  joined_date: string;
}

export interface IMembership {
  id: string;
  is_active: boolean;
  ground: {
    _id: string;
    venue: {
      _id: string;
      name: string;
    };
    name: string;
  };
  venue?: {
    _id: string;
    name: string;
  };
  sport: {
    _id: string;
    name: string;
  };
  slots: {
    morning: {
      _id: string;
      slot: string;
    }[];
    evening: {
      _id: string;
      slot: string;
    }[];
  };
  admission_fee: number;
  monthly_fee: number;
  quarterly_fee: number;
  half_yearly_fee: number;
  yearly_fee: number;
}

export interface IJoinedMemberships {
  id: string;
  member_id: string;
  membership: string;
  ground: string;
  venue: string;
  shift: string;
  "re-admission_required": boolean;
  last_payment_date: string;
  payment_due_date: string;
  joined_date: string;
}

export interface IEvent {
  id: string;
  name: string;
  description: string;
  duration: string;
  start_date: string;
  end_date: string;
  image?: string | Blob;
  registration_status: "Open" | "Closed";
  event_status: "Upcoming" | "Completed";
  is_active: boolean;
  grounds: {
    _id: string;
    venue: {
      _id?: string;
      name: string;
      address: string;
    };
    name: string;
  }[];
  sports: string[];
}

export interface IPromo {
  id: string;
  code: string;
  minimum_amount: number;
  discount_amount: number;
  discount_percentage: number;
  max_use_limit: string;
  valid_upto: string;
  terms_and_conditions: string[];
}

export interface IMessage {
  id: string;
  sender: string;
  // receiver_id: string
  seen: boolean;
  createdAt: string;
  text: string;
}

export interface IHomeBanner {
  id: string;
  url: string;
  type: "academy" | "membership" | "event";
  image: string;
  is_active: true;
}

export interface IFaq {
  id: string;
  question: string;
  answer: string;
}

export interface IBlog {
  id: string;
  title: string;
  description: string;
  quotation: string;
  details: {
    sub_title: string;
    description: string;
    _id: string;
  }[];
  createdAt: string;
  image: string
}

export interface IPopularBlog {
  id: string
  title: string
  createdAt: string
}
