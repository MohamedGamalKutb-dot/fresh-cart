import { 
  createCashOrderFromCartV2Action, 
  createCashOrderAction, 
  createCheckoutSessionAction 
} from "./checkout.action";

type Address = { details: string, phone: string, city: string };

// 1. Create Cash Order From Cart (v2)
export async function createCashOrderFromCartV2(cartId: string, shippingAddress: Address, token: string) {
  return await createCashOrderFromCartV2Action(cartId, shippingAddress, token);
}

// 2. Create Cash Order (v1)
export async function createCashOrder(cartId: string, shippingAddress: Address, token: string) {
  return await createCashOrderAction(cartId, shippingAddress, token);
}

// 3. Checkout Session
export async function createCheckoutSession(cartId: string, shippingAddress: Address, token: string, returnUrl: string) {
  return await createCheckoutSessionAction(cartId, shippingAddress, token, returnUrl);
}
