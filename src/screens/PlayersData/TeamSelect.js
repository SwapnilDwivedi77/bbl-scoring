import React, { useState } from 'react';
import styled from 'styled-components/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Text } from 'react-native';

const teams = [
  { label: 'Team A', value: 'A' },
  { label: 'Team B', value: 'B' },
  { label: 'Team C', value: 'C' },
];

const players = [
  { label: 'Player 1', value: '1' },
  { label: 'Player 2', value: '2' },
  { label: 'Player 3', value: '3' },
  { label: 'Player 4', value: '4' },
  { label: 'Player 5', value: '5' },
  { label: 'Player 6', value: '6' },
];

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #f5fcff;
`;

const TeamSelect = () => {
  const [teamStates, setTeamStates] = useState(
    teams.reduce(
      (acc, team) => ({ ...acc, [team.value]: { players: [] } }),
      {}
    )
  );

  const handlePlayerSelect = (teamValue, player) => {
    const updatedPlayers = [...teamStates[teamValue].players, player.value];
    const updatedTeamState = { ...teamStates[teamValue], players: updatedPlayers };
    setTeamStates((prevState) => ({ ...prevState, [teamValue]: updatedTeamState }));
  };

  const handlePlayerRemove = (teamValue, playerValue) => {
    const updatedPlayers = teamStates[teamValue].players.filter((player) => player !== playerValue);
    const updatedTeamState = { ...teamStates[teamValue], players: updatedPlayers };
    setTeamStates((prevState) => ({ ...prevState, [teamValue]: updatedTeamState }));
  };

  const renderTeamDropDown = (teamValue) => {
    const selectedPlayers = teamStates[teamValue].players;
    const availablePlayers = players.filter(
      (player) => !selectedPlayers.includes(player.value)
    );
    return (
      <DropDownPicker
        key={teamValue}
        items={availablePlayers}
        multiple={true}
        defaultValue={null}
        containerStyle={{ height: 40 }}
        onChangeItem={(item) => handlePlayerSelect(teamValue, item)}
      />
    );
  };

  return (
    <Container>
      {teams.map((team) => (
        <React.Fragment key={team.value}>
          <DropDownPicker
            items={[team]}
            defaultValue={null}
            containerStyle={{ height: 40 }}
            disabled={teamStates[team.value].players.length === 6}
            style={{
              backgroundColor:
                teamStates[team.value].players.length === 6 ? '#EEE' : '#FFF',
            }}
          />
          {renderTeamDropDown(team.value)}
          <Text>
            Selected players for {team.label}: {teamStates[team.value].players.join(', ')}
          </Text>
          <Button
            title="Clear selected players"
            onPress={() => {
              setTeamStates((prevState) => ({
                ...prevState,
                [team.value]: { players: [] },
              }));
            }}
          />
        </React.Fragment>
      ))}
    </Container>
  );
};

export default TeamSelect;
