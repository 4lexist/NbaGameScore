
/* FG 	FGA 	FG% 	3P 	3PA 	3P% 	FT 	FTA 	FT% 	ORB 	DRB 	TRB 	AST 	STL 	BLK 	TOV 	PF 	PTS 	GmSc 	+/-
 * parsed[0] = Field Goals Made;	
 * parsed[1] = Field Goals Attempts;
 * parsed[3] = Three Pointers Made;
 * parsed[4] = Three Pointers Attempts;
 * parsed[6] = Free Throws Made
 * parsed[7] = Free Throws Attempts;
 * parsed[9] = Offensive Rebounds;
 * parsed[10] = Defensive Rebounds;
 * parsed[11] = Total Rebounds;
 * parsed[12] = Assists;
 * parsed[13] = Steals;
 * parsed[14] = Blocks;
 * parsed[15] = Turnovers;
 * parsed[16] = Personal Fouls; 
 * parsed[18] = Bk Ref GameScore; 
 * parsed[19] = Plus / Minus; 
 * /!\ Win points not taken into account
 * * * * * * * * * * * * * * * * * * * */
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
	
	var made2 = parseInt(parsed[0]) - parseInt(parsed[3]);
	var missed2 = parseInt(parsed[1]) - parseInt(parsed[4]) - made2;
	
	var made3 = parseInt(parsed[3]);
	var missed3 = parseInt(parsed[4]) - made3;

	var madeFT = parseInt(parsed[6]);
	var missedFT = parseInt(parsed[7]) - madeFT;
	
	var OREB = parseInt(parsed[9]);
	var DREB = parseInt(parsed[10]);
	var AST = parseInt(parsed[12]);
	var STL = parseInt(parsed[13]);
	var BLK = parseInt(parsed[14]);
	var TO = parseInt(parsed[15]);
	var PF = parseInt(parsed[16]);

	var PM = parseInt(parsed[19]);
	if(!Number.isInteger(PM)){
		PM = 0;
		console.log("Warning : No plus / minus given");
	}

	var winaScore = 0.15 * PM
	+ 1 * madeFT - 0.5 * missedFT
	+ 2 * made2 - 0.5 * missed2 
	+ 3 * made3 - 0.5 * missed3
	+ 0.75 * DREB + 1 * OREB
	+ AST + 2 * STL + 2 * BLK
	- 0.75 * TO - 0.5 * PF;

	console.log("Score Winamax :" + winaScore);
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