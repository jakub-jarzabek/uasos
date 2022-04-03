import { AccommodationTime } from "../../helpers/FormTypes";

export type MatchState =
  | "INACTIVE"
  | "LOOKING_FOR_A_MATCH"
  | "FOUND_MATCH"
  | "BEING_CONFIRMED"
  | "CONFIRMED";
export type MATCH_TYPE =
  | "inactive"
  | "looking-for-match"
  | "found-a-match"
  | "being-confirmed"
  | "confirmed"
  | "rejected";
interface CommonMatched {
  id: string;
  name: string;
  country: string;
  phone_num: string;
  email: string;
  city: string;
}

export type Offer = {
  id: string;
  name: string;
  type: MATCH_TYPE;
  imageUrl: string;
  city: string;
  beds: number;
  duration: AccommodationTime;
  state: MatchState;
  matchedRequest?: CommonMatched;
};

export type Request = {
  id: string;
  city: string;
  type: MATCH_TYPE;
  beds: number;
  duration: AccommodationTime;
  state: MatchState;
  matchedOffer?: CommonMatched;
};
