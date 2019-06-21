import erd from "./erd.js"
import {createDeck, shuffleDeck} from "./deck.js"


var numOfPlayersDiv = document.getElementById('num-of-players')
window.numOfPlayersDiv = numOfPlayersDiv

var namesOfPlayersDiv = document.getElementById('player-names')
window.namesOfPlayersDiv = namesOfPlayersDiv

var confirmNamesDiv = document.getElementById('confirm-names-and-play')

window.confirmNamesDiv = confirmNamesDiv

var gamePlayDiv = document.getElementById('game-play')

var discardPileDiv = document.getElementById('discard-pile')

var goOrNotDiv = document.getElementById('go-or-not')
var cardChoiceDiv = document.getElementById('card-choice')

var startGameDiv = document.getElementById('start-game')
window.startGameDiv = startGameDiv

var checkUserChoiceDiv = document.getElementById('check-user-choice')

var invalidIndexDiv = document.getElementById('invalid-index')

var erroneousInputsDiv = document.getElementById('erroneous-inputs')
window.erroneousInputsDiv = erroneousInputsDiv

var names = []
window.names = names


/*
var playerGoing = Math.floor(Math.random() * Math.floor(window.numOfPlayersValue-1)) //declare this now so that when playGame() runs and assigns it to a value, the haveGo() function can access playerGoing
window.playerGoing = playerGoing
console.log(playerGoing)
*/



numOfPlayersDiv.style.display = 'none'
namesOfPlayersDiv.style.display = 'none'
confirmNamesDiv.style.display= 'none'
gamePlayDiv.style.display= 'none'
discardPileDiv.style.display = 'none'
goOrNotDiv.style.display = 'none'
cardChoiceDiv.style.display = 'none'
checkUserChoiceDiv.style.display = 'none'
invalidIndexDiv.style.display = 'none'
erroneousInputsDiv.style.display = 'none'


erd('BERDY')

window.startGame = startGame

function startGame() {

  startGameDiv.style.display = 'inline'
  numOfPlayersDiv.style.display = 'none'
  namesOfPlayersDiv.style.display = 'none'
  confirmNamesDiv.style.display= 'none'
  gamePlayDiv.style.display= 'none'
  discardPileDiv.style.display = 'none'
  goOrNotDiv.style.display = 'none'
  cardChoiceDiv.style.display = 'none'
  invalidIndexDiv.style.display = 'none'
  erroneousInputsDiv.style.display = 'none'

} //end function


  window.playGame = playGame

  function playGame() {

  goOrNotDiv.style.display = 'none'
  confirmNamesDiv.style.display = 'none'
  discardPileDiv.style.display = 'inline'
  gamePlayDiv.style.display= 'inline'
  gamePlayDiv.innerHTML = ''

  window.playerGoing = (window.playerGoing + 1) % window.players.length

  discardPileDiv.innerHTML = '<p>Top of discard pile: '+window.getCardString(window.discardPile)+'</p>'
  gamePlayDiv.innerHTML += '<p>'+window.names[playerGoing]+' is going</p>'
  gamePlayDiv.innerHTML += '<p>'+window.getPlayerAndCard(window.players[window.playerGoing])+'</p>'

  goOrNot()

} //end function


function goOrNot() {
  goOrNotDiv.style.display = 'inline'


} //end function
window.checkIfCanGo = checkIfCanGo

function checkIfCanGo() {

  var object = window.players[window.playerGoing].cards

  var count = 0

  for (var i = 0; i < object.length; i++) {

  var cardObject = object[i] //get ith element of 'cards' list


  if (cardObject.colour !== window.discardPile.colour && cardObject.number !== window.discardPile.number) {
    count ++
    } //end if function
  } //end for loop
  if (object.length === count) {
  checkUserChoiceDiv.innerHTML = ''
  checkUserChoiceDiv.style.display = 'inline'
  checkUserChoiceDiv.innerHTML += '<p>Oops! It looks like you have no matching cards. You\'ll need to miss a go.</p>'
} else {chooseCard()}

} //end function

function chooseCard() {
  checkUserChoiceDiv.style.display = 'none'
  goOrNotDiv.style.display = 'none'
  cardChoiceDiv.style.display = 'inline'
  var object = window.players[window.playerGoing].cards
  cardChoiceDiv.innerHTML = ''
  cardChoiceDiv.innerHTML += '<p><label>What\'s the position of the card you want to play?<input id=\'userChoice\' type=\'number\' value =\'\'></label></p>'
  cardChoiceDiv.innerHTML += '<button onclick=\'window.haveGo()\'>Play this card</button>'

}//end function

window.haveGo = haveGo

function haveGo() {

  erroneousInputsDiv.style.display = 'none'

  invalidIndexDiv.innerHTML = ''

  var userChoice = Number(document.getElementById('userChoice').value)
  userChoice -= 1

  var object = window.players[window.playerGoing].cards

  var cardObject = object[userChoice]

  if (userChoice >= object.length) {
    invalidIndexDiv.style.display = 'inline'
    invalidIndexDiv.innerHTML += '<p>Oops! You need to enter a number that corresponds with the position of the card you want to play.</p>'
  } //end if

  if (cardObject.colour == window.discardPile.colour ||  cardObject.number == window.discardPile.number) {
    gamePlayDiv.innerHTML += '<p>'+window.names[window.playerGoing]+' has matched with '+window.getCardString(cardObject)+''

    cardChoiceDiv.style.display = 'none'

    window.discardPile = Object.assign({}, cardObject)

    discardPileDiv.innerHTML = '<p>Top of discard pile: '+window.getCardString(window.discardPile)+'</p>'

    var removedCard = object.indexOf(cardObject)

    object.splice(removedCard, 1)
    
    if (object.length === 0) {
      gamePlayDiv.innerHTML += '<p>'+window.names[window.playerGoing]+' has won!</p>'
      gamePlayDiv.innerHTML += '<button onclick=\'startGame()\'>Play again</button>'
    } else {
      gamePlayDiv.innerHTML += '<p>'+window.getPlayerAndCard(window.players[window.playerGoing])+'</p>'
      gamePlayDiv.innerHTML += '<button onclick=\'playGame()\'>Next player</button>'
    } 
  } else {
      erroneousInputsDiv.style.display = 'inline'
      erroneousInputsDiv.innerHTML = ''
      erroneousInputsDiv.innerHTML += '<p>That card doesn\'t match, please try another.</p>'
      } 


} //end function

function skipGo() {

  goOrNotDiv.style.display = 'none'
  checkUserChoiceDiv.style.display = 'none'
  window.players[window.playerGoing].cards.push(window.getNextCard(window.deck))
  var object = window.players[window.playerGoing].cards
  
  gamePlayDiv.innerHTML = ''
  gamePlayDiv.innerHTML += '<p>No cards matched. '+ window.getCardString(object[object.length-1]) +' has been added to the hand.</p>'
  gamePlayDiv.innerHTML += '<p>'+window.getPlayerAndCard(window.players[window.playerGoing])+'</p>'
  gamePlayDiv.innerHTML += '<button onclick=\'playGame()\'>Next player</button>'
} //end function

window.checkIfNeedToSkip = checkIfNeedToSkip

function checkIfNeedToSkip() {
  var object = window.players[window.playerGoing].cards

  var count = 0

  for (var i = 0; i < object.length; i++) {

  var cardObject = object[i] //get ith element of 'cards' list


  if (cardObject.colour == window.discardPile.colour || cardObject.number == window.discardPile.number) {
    count ++
    } //end if function
  } //end for loop
  if (count !== 0) {
  checkUserChoiceDiv.innerHTML = ''
  checkUserChoiceDiv.style.display = 'inline'
  checkUserChoiceDiv.innerHTML += '<p>Oops! It looks like you have at least one matching card. Go on, have a go.</p>'
} else {
  skipGo()
}
} //end function
