export type WifiDetails = {
  password: string;
  networkname: string;
};

export type Listing = {
  listingid: number;
  hostid: number;
  title: string;
  description: string;
  neighborhooddescription: string;
  gettingarounddescription: string;
  size: null | string;
  amenities: string[];
  streetaddress: string;
  city: string;
  zipcode: string;
  hometype: null | string;
  unavailable: Date[] | [];
  published: boolean;
  status: string;
  instantbook: boolean;
  state: string;
  accesstype: null | string;
  guests: number;
  diningareas: number;
  bathrooms: number;
  apt: string;
  photos: string[];
  security: string[];
  baseprice: number;
  spacedescription: string;
  guestaccessdescription: string;
  otherdescription: string;
  accessibility: string[];
  cancellationpolicy: string | null;
  smokingallowed: boolean;
  filmingallowed: boolean;
  petsallowed: boolean;
  additionalrules: string;
  guestinteraction: string | null;
  wifidetails: WifiDetails;
} | null;

export type Host = {
  hostid: number;
  userid: number;
} | null;

export type User = {
  bio: string | null;
  city: string | null;
  email: string | null;
  firstname: string | null;
  ishost: boolean;
  lastname: string | null;
  phonenumber: string | null;
  profilepicture: ArrayBuffer | null;
  tempcode: string | null;
  tempcodedate: string | null;
  userid: number;
  datecreated: Date;
  state: string | null;
} | null;

export type LabeledInputProps = {
  required: boolean;
  id: string;
  display: string;
  setterFunc: (value: string) => void;
  value: string;
  validate?: (value: string) => string | null;
};

export type HostBookings = {
  bookingid: number;
  listingid: number;
  userid: number;
  hostid: number;
  bookingdate: Date;
  eventdate: Date;
  totalguestprice: number;
  hostfee: number;
  guestfee: number;
  totalhostearnings: number;
  bookingstatus: string;
};
