import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./reducers/AuthSlice";
import ProductsSlice from "./reducers/ProductsSlice";
import CartSlice from "./reducers/CartSlice";

const Store = configureStore({
  reducer: {
    auth: AuthSlice,
    products: ProductsSlice,
    cart: CartSlice,
  },
});

export default Store;
