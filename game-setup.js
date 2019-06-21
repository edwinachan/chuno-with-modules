import {getNextCard, getCardString} from "./card-functions.js"
window.getListOfNames = getListOfNames
window.confirmNamesOfPlayers = confirmNamesOfPlayers
window.numberOfPlayers = numberOfPlayers
window.createPlayers = createPlayers



function numberOfPlayers(startGameDiv, numOfPlayersDiv) {
    window.startGameDiv.style.display = 'none'
    window.numOfPlayersDiv.style.display = 'inline'
    document.getElementById('numOfPlayers').value=''
  } //end function

function getListOfNames(names, namesOfPlayersDiv, confirmNamesDiv) {
    var names = []
    window.names = names
    confirmNamesDiv.innerHTML = ''
  
    namesOfPlayersDiv.style.display = 'none'
    confirmNamesDiv.style.display = 'inline'
  
    var namesArray = document.getElementById('player-names').getElementsByTagName('input')
  
    for (var i=0; i < namesArray.length; i++) {
      window.names.push(' ' + namesArray[i].value)
    } //end for loop
    confirmNamesDiv.innerHTML += '<br>Your players are: '
    confirmNamesDiv.innerHTML += ''+names+ '<br>'
    confirmNamesDiv.innerHTML += '<br><button onclick=\'window.createDeck(window.deck); window.shuffleDeck(window.deck);window.createPlayers();window.initialDiscardPile();window.playGame();\'>Let\'s play!</button>'
  } //end function



  function confirmNamesOfPlayers(erroneousInputsDiv, numOfPlayersDiv) {
    window.erroneousInputsDiv.innerHTML = ''
    var numOfPlayersValue = document.getElementById('numOfPlayers').value
    window.numOfPlayersValue = numOfPlayersValue
  
    if (( 7 <= numOfPlayersValue) || (numOfPlayersValue <= 1 )) {
      erroneousInputsDiv.style.display = 'inline'
      erroneousInputsDiv.innerHTML += '<p>Oops! You must enter a number between 2 and 6.</p>'
      numOfPlayersValue = ''
    } else {
  
  
    window.numOfPlayersDiv.style.display = 'none'
    window.namesOfPlayersDiv.style.display = 'inline'
    window.namesOfPlayersDiv.innerHTML = ''
  
    namesOfPlayersDiv.innerHTML += '<p>What are the names of your players?</p>'
    for (var i = 0; i < numOfPlayersValue; i++) {
  
      var input = '<br><input type=\'text\' id=\'names\'>'
  
      namesOfPlayersDiv.innerHTML += input
    } //end for loop
    namesOfPlayersDiv.innerHTML += '<br><button onclick=\'window.getListOfNames(names, window.namesOfPlayersDiv, window.confirmNamesDiv)\'>Confirm names of players</button>'
    } //end if function
  } //end function

  function createPlayers () {
    var players = []
    window.players = players
    for (var i = 0; i < window.numOfPlayersValue; i++) {
      let player = {
        name: window.names[i],
        cards: [
          getNextCard(window.deck),
          getNextCard(window.deck)]
        }
        players.push(player)
        window.player = player
      }
    var playerGoing = Math.floor(Math.random() * Math.floor((window.numOfPlayersValue)-1)) //declare this now so that when playGame() runs and assigns it to a value, the haveGo() function can access playerGoing
    window.playerGoing = playerGoing
    } //end function






