import { createSlice } from '@reduxjs/toolkit'

export const PropertiesSlice = createSlice({
  name: 'properties',
  initialState: {
    key: null,
    data: {},
    icon: null,
    label: null,
    type: null,
    prevNode: null,
    nextNode: null
  },
  reducers: {
    applyProperties: (state,action) => {
      state.key = "key" in action.payload ? action.payload.key : state.key
      state.type = "type" in action.payload ? action.payload.type : state.type
      state.icon = "type" in action.payload ? action.payload.icon : state.icon
      state.label = "label" in action.payload ? action.payload.label : state.label
      state.data = "data" in action.payload ? action.payload.data : state.data
      state.prevNode = "prevNode" in action.payload ? action.payload.prevNode : state.prevNode
      state.nextNode = "nextNode" in action.payload ? action.payload.nextNode : state.nextNode
    }
    
  }
})

// Action creators are generated for each case reducer function
export const { applyProperties } = PropertiesSlice.actions

export default PropertiesSlice.reducer