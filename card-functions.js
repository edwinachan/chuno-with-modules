window.getCardString = getCardString
window.getPlayerAndCard = getPlayerAndCard
window.getCardObject = getCardObject
window.getNextCard = getNextCard


export function getNextCard(deck) {
    return deck.shift(); //shift() takes the first card in a list
  } //end function

export function getCardString (card) {
    return card.colour + ' of ' + card.number + '\n' //return string representation of card
  } //end function

export  function getPlayerAndCard (player) {
    return player.name + " has \n" + window.getCardObject(player.cards)
  } //end function

export function getCardObject (listofCards) { //need to create loop which allows us to print each card in list 'cards'
  var string = ''

  for (var i = 0; i < listofCards.length; i++) {
    string += window.getCardString(listofCards[i]) + '\n'
  }
  return string
} //end function