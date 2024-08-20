import { createSlice } from '@reduxjs/toolkit'

export const themeColor = createSlice({
  name: 'themeColor',
  initialState: {
    is_dark: true
  },
  reducers: {
    setThemeColor : (state,action)=>{
        // state.name = action.payload.name
        state.is_dark = action.payload.is_dark
    }
  }
})

// Action creators are generated for each case reducer function
export const {setThemeColor} = themeColor.actions

export default themeColor.reducer