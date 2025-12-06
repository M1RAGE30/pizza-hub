import { Api } from "../services/api-client";
import { getCartDetails } from "./get-cart-details";
import { CreateCartItemValues } from "../services/dto/cart.dto";

export async function handleCartOperation<T>(
  operation: () => Promise<T>,
  setState: (state: any) => void
): Promise<void> {
  try {
    setState({ loading: true, error: false });
    const data = await operation();
    const cartDetails = getCartDetails(data as any);
    setState(cartDetails);
  } catch (error) {
    console.error("[CART_OPERATION] Error", error);
    setState({ error: true });
  } finally {
    setState({ loading: false });
  }
}

export async function fetchCart(setState: (state: any) => void): Promise<void> {
  await handleCartOperation(() => Api.cart.getCart(), setState);
}

export async function updateCartItemQuantity(
  id: number,
  quantity: number,
  setState: (state: any) => void
): Promise<void> {
  await handleCartOperation(
    () => Api.cart.updateItemQuantity(id, quantity),
    setState
  );
}

export async function addCartItem(
  values: CreateCartItemValues,
  setState: (state: any) => void
): Promise<void> {
  await handleCartOperation(() => Api.cart.addCartItem(values), setState);
}

export async function removeCartItem(
  id: number,
  setState: (state: any) => void,
  setItems: (fn: (items: any[]) => any[]) => void
): Promise<void> {
  setItems((items) =>
    items.map((item) => (item.id === id ? { ...item, disabled: true } : item))
  );

  try {
    setState({ loading: true, error: false });
    const data = await Api.cart.removeCartItem(id);
    const cartDetails = getCartDetails(data);
    setState(cartDetails);
  } catch (error) {
    console.error("[CART_REMOVE] Error", error);
    setState({ error: true });
    setItems((items) => items.map((item) => ({ ...item, disabled: false })));
  } finally {
    setState({ loading: false });
    setItems((items) => items.map((item) => ({ ...item, disabled: false })));
  }
}

