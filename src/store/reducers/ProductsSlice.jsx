import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productsData : [],
}


const ProductsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setAllProducts : (state, action) => {
            state.productsData = action.payload;
        },
        addProduct : (state, action) => {
            state.productsData = [...state.productsData, action.payload]
        }
    },
})



export const {setAllProducts , addProduct} =  ProductsSlice.actions;

export default ProductsSlice.reducer;