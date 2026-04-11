import { registerAction } from "./register.action";
import { RegisterPayload, RegisterResult } from "./register.interface";

export async function registerUser(payload: RegisterPayload): Promise<RegisterResult> {
  return await registerAction(payload);
}
