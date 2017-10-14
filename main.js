let deckOfMemoryCards = [ 'A', 'N', 'Q', 'T', '6', 'J', 'M', 't', 'o', 'L', '[', '(', 'A', 'N', 'Q', 'T', '6', 'J', 'M', 't', 'o', 'L', '[', '(' ]

function shuffle (array) {
  let al = array.length
  let exchangedCard = ''
  let i = ''
  while (al) {
    i = Math.floor(Math.random() * al--)
    exchangedCard = array[al]
    array[al] = array[i]
    array[i] = exchangedCard
  }
  return array
}
console.log(deckOfMemoryCards)
let gameboard = document.getElementById('gameboard_wrapper')
gameboard.setAttribute('class', 'gameboard_wrapper_solid')

let startButton = document.createElement('div')
gameboard.appendChild(startButton)
startButton.classList.add('start_button')
startButton.addEventListener('click', gameStart)
startButton.innerText = 'Play'

let gameDirections = document.createElement('h3')
gameDirections.innerText = 'Hit play to start the game timer!'
gameboard.appendChild(gameDirections)

function gameStart (event) {
  shuffle(deckOfMemoryCards)
  removeStartFeatures(event)
  makeCards(event)
  gameTimer(event)
}

let singleCard = ''
function makeCards (event) {
  for (let i = 0; i < deckOfMemoryCards.length; i++) {
    singleCard = document.createElement('div')
    singleCard.classList.add(deckOfMemoryCards[ i ])
    singleCard.classList.add('facedown', 'singleCard')
    singleCard.addEventListener('click', onClick)

    let icon = document.createTextNode(deckOfMemoryCards[i])
    singleCard.innerText = icon.textContent

    gameboard.appendChild(singleCard)
  }
}

function gameTimer (event) {
  setTimeout(function () {
    let endOfGame = document.createElement('span')
    endOfGame.innerText = 'Game over'
    gameboard.appendChild(endOfGame)

    let cards = document.getElementsByClassName('singleCard')
    console.log(typeof cards)
    console.log(cards)

    for (let i = cards.length - 1; i > -1; i--) {
      cards[i].parentNode.removeChild(cards[i])
    }
  }, 20000)  /*  Give player 180,000 ms but leave at 30,000 while troubleshooting  */
}

function removeStartFeatures () {
  startButton.remove(startButton)
  gameDirections.remove(gameDirections)
  gameboard.classList.remove('gameboard_wrapper_solid')
  console.log('The start features have been removed')
}

// Next, define variables and write the function for what happens onClick

let pairArray = [] /* this array is to hold 2 cards until they get compared.  */
let matchedCards = [] /*  this array is to hold cards that have been matched and no longer have an eventlistener on them. class should be 'leave_faceup'  */

function onClick (i) {  //  *rename onFirstClick*/
  console.log('A card has been flipped')
  console.log(event.target)

  event.target.classList.remove('facedown')
  event.target.classList.add('faceup')
  event.target.classList.add('not_yet_compared')
  event.target.removeEventListener('click', onClick)
  pairArray.push(event.target)

  console.log(pairArray)  //  *the first click gets me to here when .length is set to ===2.*/

  if (pairArray.length === 2) {
    console.log('A 2nd card has been flipped')
    console.log(pairArray[0].innerText)/* coming back as undefined when '.class', changed to '.innterText'   */
    console.log(pairArray[1].innerText)
    comparePairs()
  }
}

function comparePairs () {
  if (pairArray[0].innerText === pairArray[1].innerText) {
    console.log(pairArray)
    matchedCards.push(pairArray[0], pairArray[1])
    console.log("You've made a match!")

    let matchedElements = (document.getElementsByClassName('not_yet_compared'))
    console.log(matchedElements)

    matchedElements[0].classList.remove('faceup')
    matchedElements[0].classList.add('leave_faceup')
    matchedElements[1].classList.remove('faceup')
    matchedElements[1].classList.add('leave_faceup')

    matchedElements[1].classList.remove('not_yet_compared')
    matchedElements[0].classList.remove('not_yet_compared')

    console.log(matchedElements)

    pairArray.pop()
    pairArray.shift()
    console.log(pairArray)

    console.log('The matched cards array should now list accumulating matches: ', (matchedCards))
  } else {  // *equivalent to condition: (pairArray[0] !== pairArray[1])*/
    console.log('No match!')

    pairArray.pop()
    pairArray.shift()
    console.log(pairArray)

    let nonMatchedElements = (document.getElementsByClassName('not_yet_compared'))
    console.log(nonMatchedElements)

    let delay = 500  //  Time for player to see the card face on mismatched cards */
    setTimeout(function () {
      nonMatchedElements[0].addEventListener('click', onClick)
      nonMatchedElements[1].addEventListener('click', onClick)

      nonMatchedElements[0].classList.remove('faceup')
      nonMatchedElements[0].classList.add('facedown')
      nonMatchedElements[1].classList.remove('faceup')
      nonMatchedElements[1].classList.add('facedown')
      nonMatchedElements[1].classList.remove('not_yet_compared')
      nonMatchedElements[0].classList.remove('not_yet_compared')

      console.log('The non-matched cards array should now be empty: ', (nonMatchedElements))
    }, delay)
  }
}
