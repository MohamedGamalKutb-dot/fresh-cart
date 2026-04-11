import { updateUserDataAction, updateUserPasswordAction } from "./settings.action";
import { UpdateUserDataPayload, UpdatePasswordPayload, UpdateUserDataResponse, UpdatePasswordResponse } from "./settings.interface";

export async function updateUserData(payload: UpdateUserDataPayload, token: string): Promise<UpdateUserDataResponse> {
  return await updateUserDataAction(payload, token);
}

export async function updateUserPassword(payload: UpdatePasswordPayload, token: string): Promise<UpdatePasswordResponse> {
  return await updateUserPasswordAction(payload, token);
}
