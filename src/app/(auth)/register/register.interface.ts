export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface RegisterSuccessResponse {
  message: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  token?: string;
}

export interface RegisterErrorResponse {
  statusMsg?: string;
  message?: string;
  errors?: Array<{
    msg: string;
  }>;
}

export type RegisterResult =
  | {
      success: true;
      data: RegisterSuccessResponse;
    }
  | {
      success: false;
      error: string;
    };
