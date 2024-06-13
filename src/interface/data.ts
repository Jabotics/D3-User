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
