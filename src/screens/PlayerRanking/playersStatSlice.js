import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { playersCollection } from '../../config/database';

const initialState = {
  data : [],
  loading: false,
  error:null,
}

export const fetchPlayersStats = createAsyncThunk(
    'playersStats/fetchPlayersStats',
    async (tournamentKey) => {
        try {
            let statsData =[]
            const playerStatDoc = await playersCollection.get().then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                   if(doc.data()[tournamentKey]) statsData.push(doc.data()[tournamentKey])
                  });
            });
            
            return statsData;
          } catch (error) {
            console.log(error);
          }
        
    }
  )

export const playersStatDataSlice = createSlice({
  name: 'playersStats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPlayersStats.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchPlayersStats.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })
    builder.addCase(fetchPlayersStats.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})

export default playersStatDataSlice.reducer