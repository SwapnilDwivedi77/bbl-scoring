import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { playersCollection, tournamentCollection } from '../../config/database';
import { getLoginState, persistLogin, readLoginData, setLogOut, writeLoginData } from '../../utils/loginUtils';

const initialState = {
  login : {},
  loading: false,
  error:null,
}

export const readLoginState = createAsyncThunk(
    'loginState/readLoginState',
    async () => {
        try {
            let loginData = await readLoginData()
            return loginData;
        }
           catch (error) {
            console.log(error);
          }
    }
  )

  export const setLoginState = createAsyncThunk(
    'loginState/readLoginState',
    async (data) => {
        try {
            await writeLoginData(data);
            let loginData = await readLoginData()
            return loginData;
        }
           catch (error) {
            console.log(error);
          }
    }
  )

  export const resetLoginState = createAsyncThunk(
    'loginState/resetLoginState',
    async () => {
        try {
            await setLogOut();
            let loginData = await getLoginState()
            return loginData;
        }
           catch (error) {
            console.log(error);
          }
    }
  )

export const loginStateSlice = createSlice({
  name: 'loginState',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readLoginState.pending, (state) => {
      state.loading = true
    })
    builder.addCase(readLoginState.fulfilled, (state, action) => {
      state.loading = false
      state.login = action.payload
    })
    builder.addCase(readLoginState.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    builder.addCase(resetLoginState.pending, (state) => {
        state.loading = true
      })
      builder.addCase(resetLoginState.fulfilled, (state, action) => {
        state.loading = false
        state.login = action.payload
      })
      builder.addCase(resetLoginState.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default loginStateSlice.reducer