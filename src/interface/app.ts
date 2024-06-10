export interface IAuth {
  status: boolean
  userData: {
    id?: string
    address?: string
    email?: string
    name?: string
    first_name?: string
    last_name?: string
    menu?: {
      name: string
      add: boolean
      view: boolean
      delete: boolean
      update: boolean
    }[]
    mobile?: string
    gender?: string
    profile_image?: string
    is_superadmin?: boolean
    is_subadmin?: boolean
    is_admin?: boolean
    added_by?: string
    city?: { _id: string; name: string }
  } | null
  token: string | null;
  hasToken: boolean
}