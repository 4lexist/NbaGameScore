// May need to be updated
const NBA_TEAMS_ID_MIN = 142;
const NBA_TEAMS_ID_MAX = 171;

let request = require("request");

request({
    uri: "https://www.winamax.fr/jde/contests/1285",
}, function(error, response, body) {
    if (!error && response.statusCode === 200){
        const pageSourceCode = body;

        // Winamax response looks like <script ...>var INITIAL_STATE = {OBJECT}</script>
        const initialStateObjectToJsonify = pageSourceCode.match(/var.INITIAL_STATE.=.([\s\S]*)\}<\/script></)[1] + '}';
        const initialState = JSON.parse(initialStateObjectToJsonify);

        let teamsPlayingTonight = [];
        let basketballPlayers = [];

        // Get teams playing tonight
        for (let key in initialState.entities.matches) {
            if (!initialState.entities.matches.hasOwnProperty(key)) continue;

            let match = initialState.entities.matches[key];
            if(match.team1_score === null && match.team2_score === null) {
                if(match.team1_id <= NBA_TEAMS_ID_MAX && match.team2_id >= NBA_TEAMS_ID_MIN) {
                    teamsPlayingTonight.push(match.team1_id);
                    teamsPlayingTonight.push(match.team2_id);
                }
            }
        }

        // Get players playing tonight
        for (let key in initialState.entities.players) {
            if (!initialState.entities.players.hasOwnProperty(key)) continue;

            let player = initialState.entities.players[key];
            if (player.player_position === "P" || player.player_position === "A" || player.player_position === "I") {
                if (teamsPlayingTonight.includes(player.team_id) && !player.statuses) {
                    basketballPlayers.push(
                        {
                            id: player.id,
                            name: player.player_name,
                            price: player.current_price,
                            position: player.player_position
                        }
                    )
                }
            }
        }
    } else {
        console.log("ERROR :", error);
    }

});

/*
"entities": {
    "user": {
        "user_id":0,
        "registered":false,
        "freebets":[]
        },
    "players": {
            "4884":{"id":4884,
                "team_id":150,
                "player_name":"Ishmael Smith",
                "player_shortname":"I. Smith",
                "current_price":11100000,
                "player_position":"P"
            },
*/
