// Function to get the basic data on all the active teams
export async function getTeamsData() {
    // Get the json data for all the teams from the api
    let response = await fetch('https://us-central1-stats-trax.cloudfunctions.net/app/teams');
    // Convert the data to json
    let teamsData = await response.json();
    // teamsData remains a promise with json data embeded
    // teamsData needs to accessed with a .then() to work with data
    // Return the Promise
    return teamsData;
};

// Function to get the specific team info based on the path
export function getTeam(teams, path) {
    // Iterate through the teams
    for(var index in teams) {
        // If the path includes the abbreviation of a team
        if(path.includes(teams[index]['abbreviation'])) {
            // Return the team info
            return(teams[index]);
        }
    }
};

// Function to get the current players on the specified team
export async function getTeamCurrentPlayers(team) {
    // Get the json data for the players from team specified from the api
    let response = await fetch('https://us-central1-stats-trax.cloudfunctions.net/app/players?teamId=' + team['id']);
    // Convert the data to json
    let playerData = await response.json();
    // playerData remains a promise with json data embeded
    // playerData needs to accessed with a .then() to work with data
    // Return the Promise
    return playerData;
}

// Function to get the players based on the specified id
export async function getPlayerData(playerId) {
    // Get the json data for the player from player id from the api
    let response = await fetch('https://us-central1-stats-trax.cloudfunctions.net/app/players?playerId=' + playerId);
    // Convert the data to json
    let playerData = await response.json();
    // playerData remains a promise with json data embeded
    // playerData needs to accessed with a .then() to work with data
    // Return the Promise
    return playerData;
}

// Function to get the players based on a query
export async function getPlayersData(query) {
    // Get the json data for the player based on the query from the api
    let response = await fetch('https://us-central1-stats-trax.cloudfunctions.net/app/players?' + query);
    // Convert the data to json
    let playersData = await response.json();
    // playerData remains a promise with json data embeded
    // playerData needs to accessed with a .then() to work with data
    // Return the Promise
    return playersData;
}