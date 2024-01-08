export type Listing = {
  listingid: number;
  hostid: number;
  title: null | string;
  description: null | string;
  neighborhooddescription: null | string;
  gettingarounddescription: null | string;
  size: null | string;
  amenities: string[] | [];
  streetaddress: null | string;
  city: null | string;
  zipcode: null | string;
  hometype: null | string;
  unavailable: Date[] | [];
  published: boolean;
  status: string;
  instantbook: boolean;
  state: null | string;
  accesstype: null | string;
  guests: number;
  diningareas: number;
  bathrooms: number;
  apt: null | string;
  photos: null | [];
  security: null | [];
  baseprice: number;
  spacedescription: string | null;
  guestaccessdescription: string | null;
  otherdescription: string | null;
  interactiondescription: string | null;
  accessibility: string[] | [];
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
