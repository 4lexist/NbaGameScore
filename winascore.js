/* MIN	FG	3PT	FT	OREB	DREB	REB	AST	STL	BLK	TO	PF	+/-	PTS
 * parsed[0] = Minutes Played;
 * parsed[1] = Field Goals Made - Field Goals Attempts;
 * parsed[2] = Three Pointers Made - Three Pointers Attempts;
 * parsed[3] = Free Throws Made - Free Throws Attempts;
 * parsed[4] = Offensive Rebounds;
 * parsed[5] = Defensive Rebounds;
 * parsed[6] = Rebounds;
 * parsed[7] = Assists;
 * parsed[8] = Steals;
 * parsed[9] = Blocks;
 * parsed[10] = Turnovers;
 * parsed[11] = Personal Fouls;
 * parsed[12] = Plus / Minus;
 * parsed[13] = Points; 
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
	
	var totalFG = parsed[1].split("-");
	var threePointers = parsed[2].split("-");
	var freeThrows = parsed[3].split("-");
	
	var made2 = parseInt(totalFG[0]) - parseInt(threePointers[0]);
	var missed2 = parseInt(totalFG[1]) - parseInt(threePointers[1]) - made2;
	
	var made3 = parseInt(threePointers[0]);
	var missed3 = parseInt(threePointers[1]) - made3;

	var madeFT = parseInt(freeThrows[0]);
	var missedFT = parseInt(freeThrows[1]) - madeFT;
	
	var OREB = parseInt(parsed[4]);
	var DREB = parseInt(parsed[5]);
	var REB = parseInt(parsed[6]); // Not used in the final score
	
	var AST = parseInt(parsed[7]);
	var STL = parseInt(parsed[8]);
	var BLK = parseInt(parsed[9]);
	var TO = parseInt(parsed[10]);
	var PF = parseInt(parsed[11]);
	var PM = parseInt(parsed[12]);

	var winaScore = 0.15 * PM
	+ 1 * madeFT - 0.5 * missedFT
	+ 2 * made2 - 0.5 * missed2 
	+ 3 * made3 - 0.5 * missed3
	+ 0.75 * DREB + 1 * OREB
	+ AST + 2 * STL + 2 * BLK
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
3 pts manqué 	-0,5
Lancer-franc réussi 	1
Lancer-franc manqué 	-0,5
Rebond défensif 	0,75
Rebond offensif 	1
Passe décisive 	1
Interception 	2
Contre 	2
Perte de balle 	-0,75
Faute personnelle 	-0,5
*/