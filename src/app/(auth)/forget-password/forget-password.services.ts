import { forgotPasswordAction, verifyResetCodeAction, resetPasswordAction } from "./forget-password.action";
import { ForgotPasswordPayload, VerifyResetCodePayload, ResetPasswordPayload } from "./forget-password.interface";

export async function forgotPasswordService(payload: ForgotPasswordPayload) {
  return await forgotPasswordAction(payload);
}

export async function verifyResetCodeService(payload: VerifyResetCodePayload) {
  return await verifyResetCodeAction(payload);
}

export async function resetPasswordService(payload: ResetPasswordPayload) {
  return await resetPasswordAction(payload);
}
