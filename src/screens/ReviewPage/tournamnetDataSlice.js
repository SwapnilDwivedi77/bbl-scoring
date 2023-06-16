import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { playersCollection, tournamentCollection } from '../../config/database';
import { isEmpty } from '../../utils';

const initialState = {
  data : {},
  loading: false,
  error:null,
}

export const fetchTournamentData = createAsyncThunk(
    'tournamentData/fetchTournamentData',
    async (tournamentId) => {
        try {
            const tournamentDoc = await tournamentCollection.doc(tournamentId).get();
            const tournamentData = { ...tournamentDoc.data(), id: tournamentDoc.id };
        
            const teamDocs = await tournamentCollection.doc(tournamentId).collection('teams').get();
        
            const teamPromises = teamDocs.docs.map(async (teamDoc) => {
              const { players, teamName, key, ...restData } = teamDoc.data();
        
              const playerPromises = players.map(async (playerId) => {
                const playerDoc = await playersCollection.doc(playerId).get();
                const playerData = playerDoc.data();
                if (playerData) {
                  return { id: playerDoc.id, name: playerData.name };
                }
              }).filter(promise => promise !== undefined);

        
              const playersData = await Promise.all(playerPromises);
              console.log(playersData);
              return { id: teamDoc.id, teamName, key, ...restData, players: playersData };
            });
        
            const teamsData = await Promise.all(teamPromises);
            tournamentData.teams = teamsData;
            return tournamentData;
          } catch (error) {
            console.log(error);
          }
    }
  )

export const tournamentDataSlice = createSlice({
  name: 'tournamentData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTournamentData.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchTournamentData.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })
    builder.addCase(fetchTournamentData.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})

export default tournamentDataSlice.reducer