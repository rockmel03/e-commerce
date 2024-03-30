import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./reducers/AuthSlice";
import ProductsSlice from "./reducers/ProductsSlice";

const Store = configureStore({
  reducer: {
    auth: AuthSlice,
    products: ProductsSlice,
  },
});

export default Store;
