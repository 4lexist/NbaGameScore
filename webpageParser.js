let request = require("request");

request({
    uri: "https://www.winamax.fr/jde/contests/1285",
}, function(error, response, body) {
    if (!error && response.statusCode === 200){
        const pageSourceCode = body;

        // Winamax response looks like <script ...>var INITIAL_STATE = {OBJECT}</script>
        const initialStateObjectToJsonify = pageSourceCode.match(/var.INITIAL_STATE.=.([\s\S]*)\}<\/script></)[1] + '}';
        const initialState = JSON.parse(initialStateObjectToJsonify);

        let basketballPlayers = [];
        for (let key in initialState.entities.players) {
            if (!initialState.entities.players.hasOwnProperty(key)) continue;

            let player = initialState.entities.players[key];
            if (player.player_position === "P" || player.player_position === "A" || player.player_position === "I") {
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
