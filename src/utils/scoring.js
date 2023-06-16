export const getResultString = (
    team1Score,
    team1Name,
    team2Score,
  team2Name,
) => {
  if (typeof team1Score !== 'number' || typeof team2Score !== 'number') {
    return 'Invalid scores';
  }
    let resultString = '{{TEAM_NAME}} won {{POINTS}} points';
    let winnerTeam = '',winningPoints=0
    if(team1Score > team2Score) {
        winnerTeam=team1Name
        winningPoints = team1Score
    }
    else {
        winningPoints = team2Score
        winnerTeam = team2Name
    }
    resultString = resultString.replace('{{TEAM_NAME}}',winnerTeam).replace('{{POINTS}}',winningPoints);
    return resultString;
};


export const getTeamPoints = (team1Score,team2Score,isPowerPlay) => {

    let team1Points = 0, team2Points=0;

    if(team1Score > team2Score && team2Score <=12){
         team1Points = 3;
         team2Points = 0
    }
    else if(team1Score > team2Score && team2Score >12){
        team1Points = 2;
        team2Points = 1
   }
   if(team1Score < team2Score && team1Score <=12){
    team1Points = 0;
    team2Points = 3
}
  else if(team1Score < team2Score && team1Score >12){
   team1Points = 1;
   team2Points = 2
}
    if(isPowerPlay) {
        team1Points > team2Points ? team1Points++ : team2Points++
    }

return {team1Points,team2Points}
}
