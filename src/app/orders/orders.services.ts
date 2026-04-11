import { Order } from "./orders.interface";
import { getUserOrdersAction, getAllOrdersAction } from "./orders.action";

export async function getUserOrders(userId: string): Promise<Order[]> {
  return await getUserOrdersAction(userId);
}

export async function getAllOrders(): Promise<Order[]> {
  return await getAllOrdersAction();
}
