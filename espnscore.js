/* GP	MIN	FGM-FGA	FG%	3PM-3PA	3P%	FTM-FTA	FT%	OR	DR	REB	AST	BLK	STL	PF	TO	PTS
 * parsed[0] = Games Played;	
 * parsed[1] = Minutes Played;
 * parsed[2] = Field Goals Made - Field Goals Attempts;
 * parsed[4] = Three Pointers Made - Three Pointers Attempts;
 * parsed[6] = Free Throws Made - Free Throws Attempts;
 * parsed[8] = Offensive Rebounds;
 * parsed[9] = Defensive Rebounds;
 * parsed[10] = Rebounds;
 * parsed[11] = Assists;
 * parsed[12] = Steals;
 * parsed[13] = Blocks;
 * parsed[14] = Personal Fouls;
 * parsed[15] = Turnovers;
 * parsed[16] = Points; 
 * /!\ No plus / minus and no win points
 * * * * * * * * * * * */
function printScore(){
	console.log("Please paste interesting statline");
	process.stdin.setEncoding('utf8');
	process.stdin.on('readable', function() {
	    var statline = process.stdin.read();
	    if (statline !== null) {
	    	winaGameScore(statline);
	    	process.exit();
	    }
	});
}

function winaGameScore(statline){
	var parsed = statline.split("\t");

	var totalFG = parsed[2].split("-");
	var threePointers = parsed[4].split("-");
	var freeThrows = parsed[6].split("-");
	
	var made2 = parseInt(totalFG[0]) - parseInt(threePointers[0]);
	var missed2 = parseInt(totalFG[1]) - parseInt(threePointers[1]) - made2;
	
	var made3 = parseInt(threePointers[0]);
	var missed3 = parseInt(threePointers[1]) - made3;

	var madeFT = parseInt(freeThrows[0]);
	var missedFT = parseInt(freeThrows[1]) - madeFT;
	
	var OREB = parseInt(parsed[8]);
	var DREB = parseInt(parsed[9]);
	var REB = parseInt(parsed[10]); // Not used in the final score
	
	var AST = parseInt(parsed[11]);
	var STL = parseInt(parsed[12]);
	var BLK = parseInt(parsed[13]);
	var PF = parseInt(parsed[14]);
	var TO = parseInt(parsed[15]);
	var PM = 0; // Not in EPSN per game splits

	var winaScore = 0.15 * PM
	+ 1 * madeFT - 0.5 * missedFT
	+ 2 * made2 - 0.5 * missed2 
	+ 3 * made3 - 0.25 * missed3
	+ 0.75 * DREB + 1 * OREB
	+ AST + 1.5 * STL + 1.5 * BLK
	- 0.75 * TO - 0.5 * PF;

	//console.log(PM, DREB, OREB, AST, STL, BLK, TO, PF);
	//console.log(made2, missed2, made3, missed3, madeFT, missedFT);
	console.log(winaScore);
}

printScore();

/*
Victoire de l'équipe 	4
+/- : point marqué/encaissé par l'équipe lorsque le joueur est sur le terrain 	+/-0,15
2 pts réussi 	2
2 pts manqué 	-0,5
3 pts réussi 	3
3 pts manqué 	-0,25
Lancer-franc réussi 	1
Lancer-franc manqué 	-0,5
Rebond défensif 	0,75
Rebond offensif 	1
Passe décisive 	1
Interception 	1,5
Contre 	1,5
Perte de balle 	-0,75
Faute personnelle 	-0,5
*/