export interface IAuth {
  status: boolean;
  userData: {
    id?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    mobile?: string;
    gender?: string;
    profile_img?: string;
    joined_academies?: string[];
    joined_memberships?: string[];
    favorites?: string[];
  } | null;
  token: string | null;
  hasToken: boolean;

  info_memberships?: {
    id?: string;
    your_membership_id?: string;
    member_uid?: string;
  }[];

  info_academies?: {
    id?: string;
    your_academy_id?: string;
    student_uid?: string;
  }[];
}
