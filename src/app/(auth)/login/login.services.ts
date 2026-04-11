import { loginAction } from "./login.action";
import { LoginPayload, LoginResult } from "./login.interface";

export async function loginUser(payload: LoginPayload): Promise<LoginResult> {
  return await loginAction(payload);
}
