import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { playersCollection, tournamentCollection } from '../../config/database';

const initialState = {
  list : [],
  loading: false,
  error:null,
}

export const fetchTournamentList = createAsyncThunk(
    'tournamentList/fetchTournamentList',
    async () => {
        try {
            let tournamentArray = [];
         const tournamentDoc =   await tournamentCollection.get()
            
         const tournamentPromises = tournamentDoc.docs.map(async (doc) => {
          const { tournamentName,isPublished} = doc.data();  
          return { id: doc.id,tournamentName,isPublished};
        });
    
        const dataList = await Promise.all(tournamentPromises);
        
        return dataList;
            
          } catch (error) {
            console.log(error);
          }
    }
  )

export const tournamentListSlice = createSlice({
  name: 'tournamentList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTournamentList.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchTournamentList.fulfilled, (state, action) => {
      state.loading = false
      state.list = action.payload
    })
    builder.addCase(fetchTournamentList.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})

export default tournamentListSlice.reducer