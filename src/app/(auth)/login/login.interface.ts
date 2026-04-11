export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  name: string;
  email: string;
  role: string;
}

export interface LoginSuccessResponse {
  message: string;
  token: string;
  user: AuthUser;
}

export interface AuthErrorResponse {
  statusMsg?: string;
  message?: string;
  errors?: Array<{
    msg: string;
  }>;
}

export type LoginResult =
  | {
      success: true;
      data: LoginSuccessResponse;
    }
  | {
      success: false;
      error: string;
    };
