export interface IAuth {
  status: boolean;
  userData: {
    id?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    mobile?: string;
    gender?: string;
    profile_image?: string;
    joined_academies?: string[];
    joined_memberships?: string[];
  } | null;
  token: string | null;
  hasToken: boolean;
}
