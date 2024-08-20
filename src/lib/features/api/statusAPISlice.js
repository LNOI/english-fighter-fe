import { createSlice } from '@reduxjs/toolkit'

export const statusAPISlice = createSlice({
  name: 'statusAPI',
  initialState: {
    status : 'idle',
    data : null,
    message : null,
    error : null
  },
  reducers: {
    updateStatusRequest : (state) =>{
      state.status = 'WAITING',
      state.data = null
      state.message = null
      state.error = null
    },
    updateStatusIdle : (state) =>{
      state.status = 'IDLE',
      state.data = null
      state.message = null
      state.error = null
    },
    updateStatusSuccess : (state, action) =>{
      state.status  = "SUCCESS"
      state.message  = action.payload.message
      state.data = action.payload.data
      state.error = null
    },
    updateStatusFailure : (state, action) =>{
      state.status = "FAILURE"
      state.data = null
      state.message = null
      state.error = action.payload.error
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateStatusFailure,updateStatusIdle, updateStatusSuccess, updateStatusRequest } = statusAPISlice.actions

export default statusAPISlice.reducer