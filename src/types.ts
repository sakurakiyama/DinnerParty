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
  smokingallowed: boolean | null;
  filmingallowed: boolean | null;
  petsallowed: boolean | null;
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
} | null;

export type LabeledInputProps = {
  required: boolean;
  id: string;
  display: string;
  setterFunc: (value: string) => void;
  value: string;
  validate?: () => string | null;
};
