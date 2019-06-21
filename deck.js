window.createDeck = createDeck
window.shuffleDeck = shuffleDeck
var deck = []
window.deck = deck

window.initialDiscardPile = initialDiscardPile
var discardPile
window.discardPile = discardPile



export function createDeck(deck) {

    var colours = ['Red', 'Yellow', 'Green', 'Blue']
    var numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

    for (var colourIdx = 0; colourIdx < colours.length; colourIdx++) {
      for (var numberIdx = 0; numberIdx < numbers.length; numberIdx++) {
        var card = {
          colour: colours[colourIdx],
          number: numbers[numberIdx]
        }
        deck.push(card)
      }
    }
    return deck
  } //end function

  

export function shuffleDeck(deck) {
    for (var i=0; i < deck.length; i++) {
      //Get a whole number that is between 0-length of deck. Assign it to swapIdx
      var swapIdx = Math.trunc(Math.random() * deck.length);
      var tmp = deck[swapIdx];
      //Temporarily assign the card at swapIdx within deck to 'tmp'
      deck[swapIdx] = deck[i];
      //Swap this randomly chosen card with the card we're looking at in the loop
      deck[i] = tmp;
      //We're essentially swapping deck[i] with deck[swapIdx]
      //We needed the temporary variable in order to do this swap
      }
      return deck
    } //end function


function initialDiscardPile() {
    window.discardPile = window.deck[window.deck.length - 1]
}


    
