import { 
  getLoggedUserAddressesAction, 
  addAddressAction, 
  removeAddressAction 
} from "./addresses.action";
import { AddAddressPayload } from "./addresses.interface";

export async function getLoggedUserAddresses(token: string) {
  return await getLoggedUserAddressesAction(token);
}

export async function addAddress(payload: AddAddressPayload, token: string) {
  return await addAddressAction(payload, token);
}

export async function removeAddress(addressId: string, token: string) {
  return await removeAddressAction(addressId, token);
}
