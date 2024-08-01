import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
const apiUrl = process.env.REACT_APP_API_URL;
export const addCart = createAsyncThunk("addCart", async (data, { rejectWithValue }) => {
    const responce = await fetch(`${apiUrl}/addCart/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const result = await responce.json();
    if (result.success === true) {
        return result;
    } else {
        return rejectWithValue(result);
    }
});

export const addCartDecreaseQuantity = createAsyncThunk("addCartDecreaseQuantity", async (data, { rejectWithValue }) => {
    const responce = await fetch(`${apiUrl}/addCartDecreaseQuantity/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const result = await responce.json();
    if (result.success === true) {
        return result;
    } else {
        return rejectWithValue(result);
    }
});





export const addWishlist = createAsyncThunk("addWishlist", async (data, { rejectWithValue }) => {
    const responce = await fetch(`${apiUrl}/addWishlist/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const result = await responce.json();
    if (result.success === true) {
        return result;
    } else {
        return rejectWithValue(result);
    }
});
///update agent api 
export const EditAgentDetails = createAsyncThunk("EditAgentDetails", async (data, { rejectWithValue }) => {

    const responce = await fetch(`${apiUrl}/EditAgentDetails/${data._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const result = await responce.json();
    if (result.success === true) {
        return result;
    } else {
        return rejectWithValue(result.message);
    }
})

export const getAllCartBySessionId = createAsyncThunk("getAllCartBySessionId", async (data, { rejectWithValue }) => {
    const responce = await fetch(`${apiUrl}/getAllCartBySessionId`, {
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

export const getallWishlist = createAsyncThunk("getallWishlist", async (data, { rejectWithValue }) => {
    const responce = await fetch(`${apiUrl}/getAllwishlistByUserId`, {
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

export const removecartbycartid = createAsyncThunk("removecartbycartid", async (_id, { rejectWithValue }) => {

    const responce = await fetch(`${apiUrl}/removecartbycartid/${_id}`, {
        method: "DELETE",
    })

    const result = await responce.json();

    if (result.success === true) {
        return result;
    } else {
        return rejectWithValue(result.message);
    }

});

export const removewishlistbywishlistid = createAsyncThunk("removewishlistbywishlistid", async (_id, { rejectWithValue }) => {

    const responce = await fetch(`${apiUrl}/removewishlistbycartid/${_id}`, {
        method: "DELETE",
    })

    const result = await responce.json();

    if (result.success === true) {
        return result;
    } else {
        return rejectWithValue(result.message);
    }

});





export const checkedAgent = createAsyncThunk("checkedAgent", async (_id, { rejectWithValue }) => {
    const responce = await fetch(`${apiUrl}/update_agent_access/${_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },

    })

    const result = await responce.json();
    console.log(result)
    if (result.success === true) {
        return result;
    } else {
        return rejectWithValue(result.message);
    }

})
export const CartSource = createSlice({
    name: "Cart",
    initialState: {
        Cart: [],
        Wishlist: [],
        loading: false,
        error: null,
        message: '',
    },
    extraReducers: {
        // create add Cart 
        [addCart.pending]: (state) => {
            state.loading = true;
        },
        [addCart.fulfilled]: (state, action) => {
            state.loading = false;
            const { _id } = action.payload.cart;
            if (_id) {
                const selectedData = state.Cart.find((ele) => ele._id === _id);
                if (!selectedData) {
                    state.Cart.push(action.payload.cart);
                }
                else {
                    state.Cart = state.Cart.filter((ele) => ele._id !== _id);
                    state.Cart.push(action.payload.cart);
                }
            }
        },

        [addCartDecreaseQuantity.pending]: (state) => {
            state.loading = true;
        },
        [addCartDecreaseQuantity.fulfilled]: (state, action) => {
            state.loading = false;
            const { _id } = action.payload.cart;
            if (_id) {
                const selectedData = state.Cart.find((ele) => ele._id === _id);
                if (!selectedData) {
                    state.Cart.push(action.payload.cart);
                }
                else {
                    state.Cart = state.Cart.filter((ele) => ele._id !== _id);
                    state.Cart.push(action.payload.cart);
                }
            }
        },
        [addCartDecreaseQuantity.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        // Add to wishlist 
        [addWishlist.pending]: (state) => {
            state.loading = true;
        },
        [addWishlist.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload.wishlist) {
                const { _id } = action.payload.wishlist;

                if (_id) {
                    const selectedData = state?.Wishlist?.find((ele) => ele?._id === _id);
                    if (!selectedData) {
                        state.Wishlist.push(action.payload.wishlist);
                    }
                }
            }
        },
        [addWishlist.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        //  remove wishlist 
        [removewishlistbywishlistid.pending]: (state) => {
            state.loading = true;
        },
        [removewishlistbywishlistid.fulfilled]: (state, action) => {
            state.loading = false;
            const { _id } = action.payload.wishlist;
            if (_id) {
                state.Wishlist = state.Wishlist.filter((ele) => ele._id !== _id);
            }
        },





        ////update agent details 
        // [EditAgentDetails.pending]: (state) => {
        //     state.loading = true;
        // },
        // [EditAgentDetails.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     console.log(action.payload._id)
        //     state.agent.agent = state.agent.agent.map((ele) =>
        //         ele._id === action.payload._id ? action.payload : ele
        //     );
        // },
        // [EditAgentDetails.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.message = action.payload.message;
        // },

        // get Alll cart Source 
        [getAllCartBySessionId.pending]: (state) => {
            state.loading = true;
        },
        [getAllCartBySessionId.fulfilled]: (state, action) => {
            state.loading = false;
            state.Cart = action.payload.cart;
        },
        [getAllCartBySessionId.rejected]: (state, action) => {
            state.loading = false;
            state.Cart = action.payload;
        },
        // get Alll wishlist Source 

        [getallWishlist.pending]: (state) => {
            state.loading = true;
        },
        [getallWishlist.fulfilled]: (state, action) => {
            ///console.log(action.payload)
            state.loading = false;
            state.Wishlist = action.payload.wishlist;
        },
        [getallWishlist.rejected]: (state, action) => {
            state.loading = false;
            state.Cart = action.payload;
        },

        // Delete  Agent 
        [removecartbycartid.pending]: (state) => {
            state.loading = true;
        },
        [removecartbycartid.fulfilled]: (state, action) => {
            state.loading = false;
            const { _id } = action.payload.cart;
            if (_id) {
                state.Cart = state.Cart.filter((ele) => ele._id !== _id);
            }
        },
    },
})

export default CartSource.reducer;