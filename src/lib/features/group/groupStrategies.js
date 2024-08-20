import { createSlice } from '@reduxjs/toolkit'

export const groupStrategies = createSlice({
  name: 'currentGroup',
  initialState: {
    id : null,
    name : "",
    user_id: "00000000-0000-0000-0000-000000000000",
    data : [],
    type : "GROUP"
  },
  reducers: {
    setGroupName : (state,action)=>{
        state.name = action.payload.name
        state.type = action.payload.type
    },
    setGroupData: (state,action) => {
        state.data = action.payload.data
        state.type = "type" in action.payload ? action.payload.type : state.type
    }
    ,
    setCurrentGroupData: (state,action) => {
        state.id = "id" in action.payload ? action.payload.id : state.id 
        state.name = "name" in action.payload ? action.payload.name : state.name
        state.user_id = "user_id" in action.payload ? action.payload.user_id : state.user_id
        state.data = "data" in action.payload ? (typeof action.payload.data === 'string' ? JSON.parse(action.payload.data): action.payload.data ):   state.data
        state.type = "type" in action.payload ? action.payload.type : state.type
    }
  }
})

// Action creators are generated for each case reducer function
export const {setGroupName,setGroupData,setCurrentGroupData} = groupStrategies.actions

export default groupStrategies.reducer