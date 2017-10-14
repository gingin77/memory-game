let deckOfMemoryCards = ['A', 'N', 'Q', 'T', '6', 'J', 'M', 't', 'o', 'L', '[', '(', 'A', 'N', 'Q', 'T', '6', 'J', 'M', 't', 'o', 'L', '[', '(']
let singleCard = ''
let matchedCards = [] /*  this array is to hold cards that have been matched and no longer have an eventlistener on them. class should be 'leave_faceup'  */

let gameboard = document.getElementById('gameboard_wrapper')

let textframe = document.createElement('div')
textframe.setAttribute('id', 'display_column_align')
gameboard.appendChild(textframe)

let startButton = document.createElement('div')
textframe.appendChild(startButton)
startButton.classList.add('start_button')
startButton.addEventListener('click', gameStart)
startButton.innerText = 'Play'

let gameDirections = document.createElement('h3')
gameDirections.innerText = 'Hit play to start the game timer!'
textframe.appendChild(gameDirections)

function gameStart (event) {
  removeStartFeatures()
  shuffle(deckOfMemoryCards)
  makeCards()
  gameTimer()
}

function removeStartFeatures () {
  startButton.remove(startButton)
  gameDirections.remove(gameDirections)
  gameboard.classList.remove('gameboard_wrapper_at_start')
}

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

function makeCards () {
  for (let i = 0; i < deckOfMemoryCards.length; i++) {
    singleCard = document.createElement('div')
    singleCard.classList.add(deckOfMemoryCards[i])
    singleCard.classList.add('facedown', 'singleCard')
    singleCard.addEventListener('click', onClick)

    let icon = document.createTextNode(deckOfMemoryCards[i])
    singleCard.innerText = icon.textContent
    gameboard.appendChild(singleCard)
  }
}

let pairArray = []

function onClick (i) {
  let clickedCard = event.target
  console.log('A card has been flipped')
  clickedCard.classList.remove('facedown')
  clickedCard.classList.add('faceup', 'not_yet_compared')
  // clickedCard.classList.add()
  clickedCard.removeEventListener('click', onClick)
  pairArray.push(clickedCard)

  if (pairArray.length === 2) {
    console.log('A 2nd card has been flipped')
    comparePairs()
  }
}

function comparePairs () {
  if (pairArray[0].innerText === pairArray[1].innerText) {
    handleMatchedCards(pairArray)
  } else {
    handleUnMatchedCards(pairArray)
  }
}

function handleUnMatchedCards (pairArray) {
  pairArray.pop()
  pairArray.shift()
  console.log('This is the pairArray >>> ' + pairArray)

  let nonMatchedElements = (document.getElementsByClassName('not_yet_compared'))

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
  }, 700)
}

function handleMatchedCards (pairArray) {
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
}

function gameTimer () {
  setTimeout(function () {
    let cards = document.getElementsByClassName('singleCard')
    for (let i = cards.length - 1; i > -1; i--) {
      cards[i].parentNode.removeChild(cards[i])
    }
    let gameOverAlert = document.createElement('div')
    gameOverAlert.classList.add('game_over')
    gameOverAlert.innerText = 'Game over'
    textframe.appendChild(gameOverAlert)

    let matchScore = document.createElement('h3')
    matchScore.innerText = anyMatches()
    textframe.appendChild(matchScore)
  }, 30000) /*  Give player 180,000 ms but leave at 30,000 while troubleshooting  */
}

function anyMatches () {
  let matches = matchedCards.length / 2
  if (matches === 0) {
    return "You didn't find any matches. If you want to play again, refresh the page."
  } else if (matches === 1) {
    return 'You found 1 match. If you want to play again, refresh the page.'
  } else if (matches >= 2) {
    return 'You found ' + matches + ' matches!\n\nIf you want to play again, refresh the page.'
  }
}
