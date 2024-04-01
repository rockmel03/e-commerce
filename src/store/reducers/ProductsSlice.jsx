import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsData: [],
};

const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.productsData = action.payload;
    },
    addProduct: (state, action) => {
      state.productsData = [...state.productsData, action.payload];
    },
    deleteProduct: (state, action) => {
      state.productsData = state.productsData.filter(
        (product) => product.$id !== action.payload
      );
    },
  },
});

export const { setAllProducts, addProduct, deleteProduct } =
  ProductsSlice.actions;

export default ProductsSlice.reducer;
