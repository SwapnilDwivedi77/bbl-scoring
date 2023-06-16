import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { tournamentCollection } from '../../config/database';

const initialState = {
  list: [],
  loading : false,
  error: null,
}

export const fetchFixturesList = createAsyncThunk(
  'fixturesList/fetchFixturesList',
  async(tournamentId) => {
    try {
      const fixturesDoc = await tournamentCollection.doc(tournamentId).collection('fixtures').get();
      let fixturesData = [];
      fixturesData= fixturesDoc.docs.map(doc =>{
        const data =doc.data();
        return { id : doc.id,...data}
      });
      return fixturesData
      
    }
    catch(error){
      console.log(error)
    }
  }
)

export const fixturesSlice = createSlice({
  name: 'fixtures',
  initialState,
  reducers: {
    setFixtureList: (state,action) => {
      
      state.list = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFixturesList.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchFixturesList.fulfilled, (state, action) => {
      state.loading = false
      state.list = action.payload
    })
    builder.addCase(fetchFixturesList.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})

export const {setFixtureList} = fixturesSlice.actions


export default fixturesSlice.reducer