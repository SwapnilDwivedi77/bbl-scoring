export function isEmpty(value) {
    if (value === null || value === undefined) {
      return true;
    }
    if (typeof value === 'string' || Array.isArray(value)) {
      return value.length === 0;
    }
    if (typeof value === 'object') {
      return Object.keys(value).length === 0;
    }
    return false;
  }

  export const sortFixtureList = (list) => {
    let sortedList = [...list]
   return sortedList.sort((a, b) => {
      if (a.round < b.round) {
        return -1;
      } else if (a.round > b.round) {
        return 1;
      } else {
        return a.match - b.match;
      }
    });
  }
  export function compareRounds(a, b) {
    const roundOrder = {
      SEMI_FINAL: 0,
      FINAL: 1
    };
  
    if (roundOrder[a.round] < roundOrder[b.round]) {
      return -1;
    } else if (roundOrder[a.round] > roundOrder[b.round]) {
      return 1;
    } else {
      // If the rounds are the same, sort based on the match number
      return a.match - b.match;
    }
  }


  export const  compareTeams =(a, b)=> {
    // Sort by points in decreasing order
    if (a.points > b.points) {
      return -1;
    } else if (a.points < b.points) {
      return 1;
    } else {
      // If points are the same, sort by wins in decreasing order
      if (a.win > b.win) {
        return -1;
      } else if (a.win < b.win) {
        return 1;
      } else {
        return 0;
      }
    }
  }