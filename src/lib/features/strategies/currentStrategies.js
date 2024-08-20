import { createSlice } from '@reduxjs/toolkit'

export const currentStrategies = createSlice({
  name: 'currentStrategies',
  initialState: {
    id : null,
    name : "",
    user_id: "00000000-0000-0000-0000-000000000000",
    data : [],
  },
  reducers: {
    setStrategiesName : (state,action)=>{
        state.name = action.payload.name
    },
    setStrategiesData: (state,action) => {
        state.data = action.payload
       
    },
    appendNode : (state, action)=>{
        state.data.push(action.payload)
    },
    updateNode : (state, action)=>{
        // //console.log(action.payload)
    },
    deleteNode : (state,action) =>{
    },
    onSaveStrategies : (state) =>{
        state.save = !state.save
    }
    ,
    setCurrentStrategiesData: (state,action) => {
        state.id = action.payload.id
        state.name = action.payload.name
        state.user_id = action.payload.user_id
        state.data = action.payload.data
    }
  }
})

// Action creators are generated for each case reducer function
export const {onSaveStrategies,updateNode,deleteNode,appendNode, setStrategiesName,setStrategiesData ,setCurrentStrategiesData} = currentStrategies.actions

export default currentStrategies.reducer