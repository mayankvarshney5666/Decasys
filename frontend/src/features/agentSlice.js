import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
const apiUrl = process.env.REACT_APP_API_URL;
export const addagent = createAsyncThunk("addagent", async (data, { rejectWithValue }) => {

    const responce = await fetch(`${apiUrl}/add_agent/`, {
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
        //return result.message;
    }

});



/////add address
export const addAddress = createAsyncThunk("addAddress", async (data, { rejectWithValue }) => {
    const responce = await fetch(`${apiUrl}/AddAgentAddress/`, {
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

////update address
export const editAddress = createAsyncThunk("editAddress", async (data, { rejectWithValue }) => {

    const responce = await fetch(`${apiUrl}/EditAgentAddress/${data?._id}`, {
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
});



export const getAgentDetails = createAsyncThunk("getAgentDetails", async (data, { rejectWithValue }) => {

    const responce = await fetch(`${apiUrl}/get_agent_details/${localStorage.getItem('user_id')}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
        }
    })
    const result = await responce.json(); 
    if (result.success === true) {
        return result;
    } else {
        return rejectWithValue(result.message);
    }
});



export const getAllAgent = createAsyncThunk("getAllAgent", async (data, { rejectWithValue }) => {
    const responce = await fetch(`${apiUrl}/get_all_agent`);
    const result = await responce.json();  
    if (result.success === true) {
        return result;
    } else {
        return rejectWithValue(result.message);
    }
})

export const getAgentAddress = createAsyncThunk("getAgentAddress", async (id, { rejectWithValue }) => {
    
    const responce = await fetch(`${apiUrl}/getAgentAddress/${id}`);
    const result = await responce.json();  
    if (result.success === true) {
        return result;
    } else {
        return rejectWithValue(result.message);
    }
})

export const deleteAgent = createAsyncThunk("deleteAgent", async (_id, { rejectWithValue }) => {

    const responce = await fetch(`${apiUrl}/agent_delete/${_id}`, {
        method: "DELETE",
    })

    const result = await responce.json();

    if (result.success === true) {
        return result;
    } else {
        return rejectWithValue(result.message);
    }

});

///////delete Address
export const DeleteAddress = createAsyncThunk("DeleteAddress", async (_id, { rejectWithValue }) => {

    const responce = await fetch(`${apiUrl}/deleteAgentAddress/${_id}`, {
        method: "DELETE",
    })

    const result = await responce.json();

    if (result.success === true) {
        return result;
    } else {
        return rejectWithValue(result.message);
    }

});


export const login= createAsyncThunk("login",async(data,{rejectWithValue})=>{
    const response=await fetch(`${apiUrl}/agent_login`,{
           method:"POST", 
           headers:{    
            "Content-Type":"application/json",
           }, 
           body:JSON.stringify(data)
    });
    const result=await response.json();
         

         if(result.success===true){
            localStorage.setItem('token',result?.token);
            localStorage.setItem('user_id',result?.agent?._id);
            localStorage.setItem('agent_name',result?.agent?.agent_name);
            localStorage.setItem('agent_email',result?.agent?.agent_email);
            localStorage.setItem('agent_mobile',result?.agent?.agent_mobile);
            localStorage.setItem('role',result?.agent?.role);
            localStorage.setItem('agent_roll',result?.agent?.agent_roll);   
          
            return result;
        }else{  
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
export const agentSource = createSlice({
    name: "agent",
    initialState: {
        agent: [],
        Agent:[],
        Address:[],
        loading: false,
        error: null,
        message: '',
    },
    extraReducers: {
        // create add leadsource

        [addagent.pending]: (state) => {
            state.loading = true;
        },
        [addagent.fulfilled]: (state, action) => {
            state.loading = false;
            state.agent.push(action.payload.agent);
            state.message = action.payload.message;
        },
        [addagent.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },

        ///add address
        [addAddress.pending]: (state) => {
            state.loading = true;
        },
        [addAddress.fulfilled]: (state, action) => {
            state.loading = false;
            state.Address.push(action.payload.agentAddress);
            state.message = action.payload.message;
        },
        [addAddress.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },

         ////update agent Address 
        [editAddress.pending]: (state) => {
            state.loading = true;
        },
        [editAddress.fulfilled]: (state, action) => {
            state.loading = false;
            state.Address = state.Address?.map((ele) =>
                ele._id === action.payload.updateagent._id ? action.payload.updateagent : ele
            );
        },
        [editAddress.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },


        ////update agent details 
        [EditAgentDetails.pending]: (state) => {
            state.loading = true;
        },
        [EditAgentDetails.fulfilled]: (state, action) => {
            state.loading = false;
            console.log(action.payload._id)
            state.agent.agent = state.agent.agent.map((ele) =>
                ele._id === action.payload._id ? action.payload : ele
            );
        },
        [EditAgentDetails.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        /// get Alll lead Source
        [getAgentDetails.pending]: (state) => {  
            state.loading = true;
        },
        [getAgentDetails.fulfilled]: (state, action) => {
            state.loading = false;
            state.Agent.push(action.payload.agent);
        },
        [getAgentDetails.rejected]: (state, action) => {
            state.loading = false;
            state.Agent = action.payload;
        },

        /// get Alll agent address
        [getAgentAddress.pending]: (state) => {  
            state.loading = true;
        },
        [getAgentAddress.fulfilled]: (state, action) => {
            state.loading = false;
            state.Address=action.payload.agentAddress;
        },
        [getAgentAddress.rejected]: (state, action) => {
            state.loading = false;
            state.Address = action.payload;
        },


        /// Delete  Agent 
        [deleteAgent.pending]: (state) => {
            state.loading = true;
        },
        [deleteAgent.fulfilled]: (state, action) => {
            state.loading = false;
            const { _id } = action.payload.agent;
            if (_id) {
                state.agent.agent = state.agent.agent.filter((ele) => ele._id !== _id);
            }
        },

        /////DeleteAddress
        [DeleteAddress.pending]:(state)=>{
            state.loading=true;
        },
        [DeleteAddress.fulfilled]:(state,action)=>{
            state.loading=false;
           const {_id} =action.payload.agent;
           if (_id) {
            state.Address = state.Address.filter((ele) => ele._id !== _id);
        }
        }
        
    },
})

export default agentSource.reducer;