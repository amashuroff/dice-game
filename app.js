/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, currentPlayer, hideDice, gameOn, previousDice, winCondition;

scores = [0,0];
roundScore = 0;
currentPlayer = 0; // first player = 0, second player = 1
hideDice = document.querySelectorAll('.dice');
gameOn = false;
previousDice = 0;
winCondition = 100;

// roll functionality
document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if (gameOn) {

        // random number that will decide the score and the image
        var dice = Math.floor((Math.random()* 6) + 1);
        var diceDOM = document.querySelector('.dice');
        // display the result
        diceDOM.style.display = 'block';
        diceDOM.src = `dice-${dice}.png`;

        // second dice
        var dice_2 = Math.floor((Math.random()* 6) + 1);
        var diceDOM_2 = document.querySelector('.dice-2');
        diceDOM_2.style.display = 'block';
        diceDOM_2.src = `dice-${dice_2}.png`;
        
        // if rolls 6 two times in a row, remove all score
        if (dice === 6 && previousDice === 6) {
            scores[currentPlayer] = 0;
            roundScore = 0;
            document.querySelector('#current-' + currentPlayer).innerHTML = 0;
            hideAllDice();
            changePlayer();
        // if score is !== to 1, continue playing
        } else if (dice !== 1 && dice_2 !== 1) {
            roundScore += dice;
            roundScore += dice_2;
            document.querySelector('#current-' + currentPlayer).innerHTML = roundScore;
            
        // change player, remove score if rolled 1
        } else {
            roundScore = 0;
            document.querySelector('#current-' + currentPlayer).innerHTML = 0;
            changePlayer();
            setTimeout(hideAllDice, 1000);
        }
        previousDice = dice;
    }
});

// hold functionality
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gameOn) {
        // hide the previous dice
        hideAllDice();
        // remove current score and add to global score
        document.querySelector(`#current-` + currentPlayer).innerHTML = 0;
        scores[currentPlayer] += roundScore;
        roundScore = 0;
        var playerScoreDOM = document.getElementById('score-' + currentPlayer);
        playerScoreDOM.innerHTML = scores[currentPlayer];

        if (scores[currentPlayer] >= winCondition) {
            document.querySelector(`#name-${currentPlayer}`).innerHTML = '<em>Winner!</em>';
            document.querySelector(`.player-${currentPlayer}-panel`).classList.add('winner');
            gameOn = false;
        } else {
            changePlayer();
        }
    }
});

// new game
document.querySelector('.btn-new').addEventListener('click', function() {
    removeAllScores();
    removeAllClasses();

    // decide who will play next based on random num
    randNum = Math.floor(Math.random()*2);
    currentPlayer = randNum;
    document.querySelector(`.player-${currentPlayer}-panel`).classList.add('active');
    gameOn = true;
});

// select the winning condition (number)
document.querySelector('.input-btn').addEventListener('click', function() {
    winCondition = document.getElementById('win').value;
})

// change player
function changePlayer() {
    if (currentPlayer === 0) {
        currentPlayer = 1;
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');
    } else {
        currentPlayer = 0;
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
    }
};

// remove all scores
function removeAllScores() {
    // remove previous scores
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector(`#name-${currentPlayer}`).innerHTML = `Player ${currentPlayer + 1}`;

    scores = [0,0];
    roundScore = 0;

    hideAllDice();
};
// remove all classes
function removeAllClasses() {
    document.querySelector(`.player-0-panel`).classList.remove('active', 'winner');
    document.querySelector(`.player-1-panel`).classList.remove('active', 'winner');

};
// hide all dice
function hideAllDice() {
    for(var i = 0; i < hideDice.length; i++) {
        hideDice[i].style.display = 'none';
    }
}