const point = ["0", "15", "30", "40"];

/*
Calcul le score du jeu en cours
params :
  scoreboard -> objet qui stocke le score du match
  players -> tableau qui contient le nom des joueurs
  pFirst -> score du joueur 1 pour la manche en cours
  pSec -> score du joueur 2 pour la manche en cours
  tieBreak -> booléen qui indique si c'est un tiebreak ou non
  min -> nombre entier indiquant le minimum à atteindre pour afficher AV

return:
  scoreboard -> Objet
 */
function calculCurrentGame(scoreboard, players, pFirst, pSec, tieBreak, min) {
  if (pFirst < 4 && pSec < 4 && tieBreak === false) {
    scoreboard[players[0]].currentGame = point[pFirst];
    scoreboard[players[1]].currentGame = point[pSec];
  } else if (pFirst === pSec && pFirst >= 3 && tieBreak === false){
    scoreboard[players[0]].currentGame = "40";
    scoreboard[players[1]].currentGame = "40";
  } else if (pFirst > pSec && pFirst - pSec == 1 && pFirst > min) {
    scoreboard[players[0]].currentGame = "AV";
    scoreboard[players[1]].currentGame = "-";
  } else if (pFirst < pSec && pSec - pFirst == 1 && pSec > min) {
    scoreboard[players[0]].currentGame = "-";
    scoreboard[players[1]].currentGame = "AV";
  } else {
    scoreboard[players[0]].currentGame = `${pFirst}`;
    scoreboard[players[1]].currentGame = `${pSec}`;
  }
  return scoreboard;
}

/*
Vérifie s'il y a un gagnant, met à jour l'objet scoreboard si besoin et indique l'état du match.
params :
  scoreboard -> Objet qui stocke le score du match
  players -> tableau qui contient le nom des joueurs

return:
  finish -> booléen
  scoreboard -> objet
 */
function checkWinner(scoreboard, players) {
  let win_streak = [];
  let finish = false;
  Object.keys(scoreboard[players[0]]).map(e => {
    let pFirst = scoreboard[players[0]][e];
    let pSec = scoreboard[players[1]][e];
    if ((pFirst >= 6 && pFirst > (pSec + 1)) || pFirst === 7)
      win_streak.push(players[0]);
    else if ((pSec >= 6 && (pFirst + 1) < pSec) || pSec === 7)
      win_streak.push(players[1]);
  })
  if (win_streak.filter(e => e == players[0]).length == 3) {
    finish = true;
    scoreboard[players[0]].winner = true;
    scoreboard[players[1]].winner = false;
  }
  else if (win_streak.filter(e => e == players[1]).length == 3) {
    finish = true;
    scoreboard[players[0]].winner = false;
    scoreboard[players[1]].winner = true;
  }
  return [finish, scoreboard];
}

/*
Vérifie si le set est complet ou pas et retourne un booléen en conséquence
params :
  setpFirst -> nombre de jeux du joueur 1 pour le set en cours
  setpSec -> nombre de jeux du joueur 2 pour le set en cours

return:
  true -> le set est complet
  false -> le set n'est pas complet
 */
function checkSetIsCompleted(setpFirst, setpSec) {
  if (setpFirst === 6 && setpSec < 5)
    return true;
  else if (setpSec === 6 && setpFirst < 5)
    return true;
  else if (setpFirst === 7 || setpSec === 7)
    return true;
  return false;
}

/*
Vérifie si le jeu est un tiebreak ou non, puis appel la
fonction checkGameIsCompleted avec les bons paramètres et retourne sa réponse

params :
  scoreFirst -> nombre de points du joueur1 pour ce jeu
  scoreSec -> nombre de points du joueur2 pour ce jeu
  setpFirst -> nombre de jeux du joueur 1 pour le set en cours
  setpSec -> nombre de jeux du joueur 2 pour le set en cours

return:
  true -> le jeu en cours est fini
  false -> le jeu en cours n'est pas fini
 */
function checkTieBreak(scoreFirst, scoreSec, setpFirst, setpSec) {
  if (setpFirst === 6 && setpSec === 6)
    return checkGameIsCompleted(scoreFirst, scoreSec, 6, 7);
  return checkGameIsCompleted(scoreFirst, scoreSec, 3, 4);
}


/*
Vérifie si le jeu est un tiebreak ou non, puis vérifie si le jeu en cours est terminée
params :
  scoreFirst -> nombre de jeux du joueur1 pour ce set
  scoreSec -> nombre de jeux du joueur2 pour ce set
  min -> nombre permettant de vérifier si l'écarts de points est assez grand
  max -> nombre permettant de savoir si le jeu est gagné

return:
  true -> le jeu en cours est fini
  false -> le jeu en cours n'est pas fini
*/
function checkGameIsCompleted(scoreFirst, scoreSec, min, max) {
  if (scoreFirst === max && scoreSec < min)
    return true;
  else if (scoreSec === max && scoreFirst < min)
    return true;
  else if ((scoreFirst - scoreSec) % 2 === 0 && scoreFirst >= min && scoreSec >= min && scoreFirst != scoreSec)
    return true;
  return false;
}

/*
Calcul le score du match, indique s'il y a un gagnant ou si le jeu est en cours et le score du jeu en cours
params :
  points -> tableau de string avec le nom de qui à remporter le point, ex: ["joueuer1", "joueur1", ...]
  players -> tableau de string avec le nom des joueurs

return:
  scoreboard -> objet
*/
function calculGameProgress(points , players) {
  let scoreboard = {};
  let key = "Set ";
  let set = 1;
  let pFirst = 0;
  let pSec = 0;
  let finish = false;
  players.forEach(e => {
    scoreboard[e] = {};
    scoreboard[e][key + set] = 0;

  });
  points.map(e => {
    if (finish)
      return;
    if (e === players[0])
      pFirst += 1;
    else
      pSec += 1;
    if (checkTieBreak(pFirst, pSec, scoreboard[players[0]][key + set], scoreboard[players[1]][key + set])) {
      pFirst = 0;
      pSec = 0;
      scoreboard[e][key + set] += 1;
    }
    [finish, scoreboard] = checkWinner(scoreboard, players);
    if (checkSetIsCompleted(scoreboard[players[0]][key + set], scoreboard[players[1]][key + set]) && finish === false) {
      set += 1;
      players.forEach(e => scoreboard[e][key + set] = 0);
    }
  });
  if (!finish) {
    if (scoreboard[players[0]][key + set] === 6 && scoreboard[players[0]][key + set] === 6)
      scoreboard = calculCurrentGame(scoreboard, players, pFirst, pSec, true, 6);
    else
      scoreboard = calculCurrentGame(scoreboard, players, pFirst, pSec, false, 3);
  }

  return scoreboard;
}

export {calculGameProgress};