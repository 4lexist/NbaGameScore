# NbaGameScore

Here are two `.js` files aiming to calculate a score based on a stat-line. The primary goal was to anticipate future game scores based on averages per games in order to optimize team choices in the Winamax game : [**Jeu de l'entraineur**](https://www.winamax.fr/jde).

The calulations are made based on the following rules : 
* Winning Team : +4
* Plus / Minus : +/- 0,15
* 2 pts FG made : +2
* 2 pts FG missed :	-0,5
* 3 pts FG made : +3
* 3 pts FG missed : -0,5
* Free throw made : +1
* Free throw missed : -0,5
* Defensive rebound : +0,75
* Offensive rebound : +1
* Assist : +1
* Steal : +2
* Block : +2
* Turnover : -0,75
* Personal Foul : -0,5

**/!\\** The calculated score does not take into account whether the player won or lost, you have to take into account the potential **+4**

## `espnscore.js`

Calculate score based on average per games. For example if we want to know how many points Lebron James would have brought to the *Jeu de l'entraineur*, you can do the following : 
* Open a Terminal
* Go to the folder NbaGameScore
* Type `node espnscore.js`
* Then when asked to enter a stat-line go on his [ESPN page](http://www.espn.com/nba/player/splits/_/id/1966/lebron-james)
* Copy paste any stat-line (make sure they include ORB and DRB)
* See the result :)

**/!\\** This stat-line doesn't take into account the plus/minus

## `winascore.js`

Calculate score based on a particular game. You can give any stat-line from an ESPN boxscore that you can find on this [page](http://www.espn.com/nba). Then do the following : 
* Open a Terminal
* Go to the folder NbaGameScore
* Type `node winascore.js`
* Copy paste any stat-line from the boxscore (without including the player's name)
* See the result :)

### Nota Bene

This is of course not an official way to calculate game scores, and it seems that EPSN's plus/minus and Winamax's one differ a little sometimes so there might be a score difference of 0,15 or 0,30.


