import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
const apiUrl = process.env.REACT_APP_API_URL;


export const GetOrderBySessionIdOrUserId = createAsyncThunk("GetOrderBySessionIdOrUserId", async (data, { rejectWithValue }) => {
    const responce = await fetch(`https://www.backend.decasys.in/api/v1/GetOrderBySessionIdOrUserId`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    const result = await responce.json();

    if (result.success === true) {
        return result;
    } else {
        return rejectWithValue(result.message);
    }
})


export const OrderSource = createSlice({
    name: "Order",
    initialState: {
        Order: [],
        loading: false,
        error: null,
        message: '',
    },
    extraReducers: {
        // get Alll cart Source 
        [GetOrderBySessionIdOrUserId.pending]: (state) => {
            state.loading = true;
        },
        [GetOrderBySessionIdOrUserId.fulfilled]: (state, action) => {
            state.loading = false;
            state.Order = action.payload.allOrder;
        },
        [GetOrderBySessionIdOrUserId.rejected]: (state, action) => {
            state.loading = false;
            state.Order = action.payload;
        },
    }, 
})

export default OrderSource.reducer;