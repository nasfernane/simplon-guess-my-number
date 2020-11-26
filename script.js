'use strict';

// ------ VARIABLES ------ /

// générateur de nombre aléatoire entre 1 et 100
let secretNumber = Math.trunc(Math.random() * 100) + 1;
// score du joueur
let score = 10;
// nombres précédemment entrés par l'utilisateur
let previousNumbers = '';
// variable pour garder le plus haut score réalisé par l'utilisateur
let highscore = 0;

// ----- FIN VARIABLES ----- /

// ----- FONCTIONS ----- /

// factorisation du changement de message dans une fonction
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// vérification du nombre entré par l'utilisateur
const checkUserNumber = function () {
  // nombre entré par l'utilisateur
  const guess = Number(document.querySelector('.guess').value);

  // Quand il n'y a pas de valeur entrée dans l'input
  if (!guess) {
    displayMessage('Choose number');
    // si le nombre n'est pas un entier
  } else if (!Number.isInteger(guess)) {
    displayMessage('Use Integer');
    // quand le joueur trouve le bon nombre
  } else if (guess === secretNumber) {
    document.querySelector('.number').textContent = secretNumber;
    displayMessage('Correct Number !');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '25rem';
    // si son score dépasse son highscore précédent
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
    // si le nombre de l'utilsateur est différent du nombre secret..
  } else if (guess !== secretNumber) {
    // ..et qu'il lui reste un coup d'essai
    if (score > 1) {
      // opérateur ternaire pour afficher une phrase différente si le nombre est trop grand ou trop petit
      displayMessage(
        guess > secretNumber
          ? '📈 Your number is too high'
          : '📉 Your number is too low'
      );

      // réduit et affiche son score
      score--;
      document.querySelector('.score').textContent = score;
      // ajoute sa saisie aux nombres précédents
      previousNumbers += `${guess} - `;
      document.querySelector('.previousNumbers').textContent = previousNumbers;
      // autrement, si le joueur a épuisé tous ses essais
    } else {
      document.querySelector('.score').textContent = 0;
      displayMessage('💥 You failed...');
    }
  }

  document.querySelector('.guess').value = '';
};

// fonction pour relancer le jeu
const playAgain = function () {
  secretNumber = Math.trunc(Math.random() * 100) + 1;
  score = 10;
  previousNumbers = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  displayMessage('Start guessing...');
  document.querySelector('.previousNumbers').textContent = previousNumbers;
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
};

// ----- FIN FONCTIONS -----

// ----- ECOUTEURS -----

// écouteur sur bouton check qui lance checkNumber()
document.querySelector('.check').addEventListener('click', checkUserNumber);
// écouteur sur bouton again pour relancer le jeu
document.querySelector('.again').addEventListener('click', playAgain);
// écouteur sur bouton Enter
document.addEventListener('keydown', function (e) {
  if (e.code === 'Enter' || e.code === 'NumpadEnter') checkUserNumber();
});

// ----- FIN ECOUTEURS -----
