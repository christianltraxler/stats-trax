// Function to get the basic data on all the active teams
export function getTeamsData() {
    // Get the json data or all the teams from the api
    let response = fetch('https://us-central1-stats-trax.cloudfunctions.net/app/teams');
    // Convert the data to json
    let teamsData = response.then(response => response.json());
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