export class Player {
  id: number;
  uuid: string;
  email: string;
  email_confirmed: boolean;
  email_confirmed_at: string;
  verified: boolean;
  verified_at: string;
  activated: boolean;
  activated_at: string;
  blocked: boolean;
  blocked_at: string;
  deleted: boolean;
  deleted_at: string;
  affiliated: boolean;
  affiliated_at: string;

  first_name: string;
  middle_name: string;
  last_name: string;
  nickname: string;
  date_of_birth: string;
  gender: string;

  locale_code: string;

  phone_code_id: number;
  phone_number: string;

  currency: string;

  country_code: string;
  region: string;
  city: string;
  address: string;
  postal_code: string;

  time_zone_id: string;
  subscription: string;
  refuse_bonuses: boolean;
  newsletter: boolean;

  country_allowed: boolean;
  profile_filled: boolean;
  deposited: boolean;

  created_at: string;
  updated_at: string;
}
