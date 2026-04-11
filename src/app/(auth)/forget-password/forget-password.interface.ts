export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  statusMsg?: string;
  message: string;
}

export interface VerifyResetCodePayload {
  resetCode: string;
}

export interface VerifyResetCodeResponse {
  status: string;
}

export interface ResetPasswordPayload {
  email: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  token: string;
}
