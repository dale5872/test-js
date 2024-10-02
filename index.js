// We import the object from the data file. Inside that object there is a function to get players data
const data = require("./data");

/**
 * Test 1
 * Write a function to log in the console the players data with this format:
 * PLAYER 1
 * NAME: Zinedine
 * LASTNAME: Zidane
 * POSITION: Midfielder
 * PLAYER 2...
 */

 // Your code
function printPlayers() {
    const players = data.getPlayers();
    players.forEach((player, idx) => {
        console.log(`PLAYER ${idx + 1}`);
        console.log(`NAME: ${player.name}`);
        console.log(`LASTNAME: ${player.lastname}`);
        console.log(`POSITION: ${player.position}`);
    });
}


/**
 * Test 2
 * Write a function to log in the console an array with only the names of the players, ordered by name length descending
 */

// Your code
function printPlayerNameDescending() {
    // Assuming that name references the players first and last names.
    const players = data.getPlayers();
    let playerNames = [];

    for(const player of players) {
        playerNames.push(`${player.name} ${player.lastname}`);
    }

    playerNames.sort((a, b) => a.length > b.length ? -1 : 1);

    console.log(playerNames);
}

/**
 * Test 3
 * Write a function to log in the console the average number of goals there will be in a match if all the players in the data play on it
 * scoringChance means how many goals per 100 matches the player will score
 * Example: 10 players play in a match, each of them has a 0.11 scoringChance, the total number of goals will be 1.1 average 
 * Output example -> Goals per match: 2.19
 */

// Your code
function getAverageExpectedGoals() {
    const players = data.getPlayers();
    let scoringChance = 0;

    for(const player of players) {
        if(typeof player.scoringChance === 'string') {
            scoringChance += parseInt(player.scoringChance);
            continue;
        }
        scoringChance += player.scoringChance;
    }
    // Assuming that player.scoringChance is a floating point number,
    // each scoringChance will be divided by 10, and then averaged by the number of players
    scoringChance = (scoringChance / 10) / players.length;

    console.log(`Goals per match: ${scoringChance}`);
}

/**
 * Test 4
 * Write a function that accepts a name, and logs the position of the player with that name (by position it means striker, goalkeeper...)
 */

// Your code
function getPlayerPosition(name) {
    const players = data.getPlayers();
    const player = players.find(player => player.name === name);

    if(player === undefined) {
        console.log(`Could not find player ${name}`);
        return;
    }

    console.log(`${player.name} ${player.lastname}'s position is ${player.position}`);
}

/**
 * Test 5
 * Write a function that splits all the players randomly into 2 teams, Team A and Team B. Both teams should have same number of players.
 * The function should log the match score, using the average number of goals like the Test 3 and rounding to the closest integer
 * Example:
 *      Team A has 4 players, 2 with 50 scoringChance and 2 with 70 scoringChance. 
 *      The average score for the team would be 2.4 (50+50+70+70 / 100), and the closest integer is 2, so the Team A score is 2
 */

// Your code
function getSimulatedResult() {
    const players = data.getPlayers();
    const teamA = {};
    const teamB = {};

    let playersPicked = 0;
    while(playersPicked < players.length) {
        const player = Math.floor(Math.random() * 10);
        const scoringChance = players[player].scoringChance;

        if(teamA[player] === undefined && teamB[player] === undefined) {
            // Player not picked before
            const xG = typeof scoringChance === 'string' ? parseInt(scoringChance) : scoringChance;
            if(playersPicked % 2 === 0) {
                teamA[player] = xG;
            } else {
                teamB[player] = xG;
            }
            playersPicked++;
        }
    }

    let teamAScore = 0;
    let teamBScore = 0;

    Object.values(teamA).forEach((scoringChance) => {teamAScore += scoringChance});
    Object.values(teamB).forEach((scoringChance) => {teamBScore += scoringChance});

    // Assuming that player.scoringChance is a floating point number,
    // each scoringChance will be divided by 10, and then averaged by the number of players in the team
    teamAScore = Math.round(teamAScore / 50);
    teamBScore = Math.round(teamBScore / 50);

    console.log(`Team A ${teamAScore}:${teamBScore} Team B`);
}

// Output
console.log('Test 1 Output: \n');
printPlayers();

console.log('\nTest 2 Output: \n');
printPlayerNameDescending();

console.log('\nTest 3 Output: \n');
getAverageExpectedGoals();

console.log('\nTest 4 Output: \n');
getPlayerPosition('Timo');
getPlayerPosition('Lucas');
getPlayerPosition('John');
getPlayerPosition(0);
getPlayerPosition(false);

console.log('\nTest 5 Output: \n');
getSimulatedResult();