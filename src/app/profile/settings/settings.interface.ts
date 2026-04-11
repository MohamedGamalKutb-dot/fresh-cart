export interface UserData {
  name: string;
  email: string;
  phone: string;
}

export interface UpdateUserDataPayload {
  name: string;
  email: string;
  phone: string;
}

export interface UpdatePasswordPayload {
  currentPassword: string;
  password: string;
  rePassword: string;
}

export interface UpdateUserDataResponse {
  message: string;
  user: {
    name: string;
    email: string;
    phone: string;
    role: string;
    _id: string;
  };
}

export interface UpdatePasswordResponse {
  message: string;
  token: string;
}
