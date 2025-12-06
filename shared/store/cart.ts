import { create } from "zustand";
import { CartStateItem } from "../lib/get-cart-details";
import { CreateCartItemValues } from "../services/dto/cart.dto";
import {
  fetchCart,
  updateCartItemQuantity,
  addCartItem,
  removeCartItem,
} from "../lib/cart-store-helpers";

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  fetchCartItems: () => Promise<void>;

  updateItemQuantity: (id: number, quantity: number) => Promise<void>;

  addCartItem: (values: CreateCartItemValues) => Promise<void>;

  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    await fetchCart(set);
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    await updateCartItemQuantity(id, quantity, set);
  },

  removeCartItem: async (id: number) => {
    await removeCartItem(
      id,
      set,
      (fn) => set((state) => ({ ...state, items: fn(state.items) }))
    );
  },

  addCartItem: async (values: CreateCartItemValues) => {
    await addCartItem(values, set);
  },
}));
