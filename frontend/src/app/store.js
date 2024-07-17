import { configureStore } from "@reduxjs/toolkit";
import agentSlice from "../features/agentSlice";
import cartSlice from "../features/cartSlice";
import orderSlice from "../features/orderSlice";

export const store=configureStore({
    reducer:{
        agentSlice:agentSlice,
        cartSlice:cartSlice,
        orderSlice:orderSlice,
    }
});
export default store;