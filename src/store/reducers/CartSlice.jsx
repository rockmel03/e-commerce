import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {
    cartId: null,
    userAuthToken: null,
    registeredUser: false,
    items: [],
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addCartItem: (state, action) => {
      state.cart.items.push(action.payload);
    },
    removeCartItem: (state, action) => {
      state.cart.items = state.cart.items.filter(
        (item) => item.itemId !== action.payload
      );
    },
  },
});

export const { setCart, addCartItem, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;

/* const schema = {
  cartId: 604638499041,
  userAuthToken: null,
  registeredUser: false,
  items: [
    {
      itemId: "1000000015",
      quantity: 5,
      group: ["LPCUsIdKqZhjHoA1Ok3tMCsc"],
      price: {
        sale: 10,
        base: 50,
        discount: {
          price: 0,
        },
        currency: "USD",
      },
      extra: {},
    },
    {
      itemId: "1002200074",
      quantity: 1,
      group: ["3NXSiwNoKbQxe5pbM9hc10lb"],
      price: {
        sale: 0,
        base: 450,
        discount: {
          price: 0,
        },
        currency: "USD",
      },
      extra: {},
    },
  ],
}; */
