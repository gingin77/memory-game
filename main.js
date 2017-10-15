let deckOfMemoryCards = ['A', 'N', 'Q', 'T', '6', 'J', 'M', 't', 'o', 'L', '[', '(', 'A', 'N', 'Q', 'T', '6', 'J', 'M', 't', 'o', 'L', '[', '(']
let singleCard = ''
let pairArray = []
let matchedCards = []
let gameTime = 1000000

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
  displayTime()
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

function onClick (i) {
  let clickedCard = event.target
  clickedCard.classList.remove('facedown')
  clickedCard.classList.add('faceup', 'not_yet_compared')
  clickedCard.removeEventListener('click', onClick)
  pairArray.push(clickedCard)

  if (pairArray.length === 2) {
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
  pairArray.length = 0
  let nonMatchedElements = (document.getElementsByClassName('not_yet_compared'))

  setTimeout(function () {
    for (let i = 0; i < nonMatchedElements.length; i++) {
      nonMatchedElements[i].addEventListener('click', onClick)
    }
    nonMatchedElements[0].classList.remove('faceup')
    nonMatchedElements[0].classList.add('facedown')
    nonMatchedElements[1].classList.remove('faceup')
    nonMatchedElements[1].classList.add('facedown')
    nonMatchedElements[1].classList.remove('not_yet_compared')
    nonMatchedElements[0].classList.remove('not_yet_compared')
  }, 700)
}

function handleMatchedCards (pairArray) {
  matchedCards.push(pairArray[0], pairArray[1])
  let matchedElements = (document.getElementsByClassName('not_yet_compared'))

  matchedElements[0].classList.remove('faceup')
  matchedElements[0].classList.add('leave_faceup')
  matchedElements[1].classList.remove('faceup')
  matchedElements[1].classList.add('leave_faceup')

  matchedElements[1].classList.remove('not_yet_compared')
  matchedElements[0].classList.remove('not_yet_compared')

  pairArray.length = 0
}

function displayTime () {
  secondsLeft = gameTime / 1000

  let interval = setInterval(function () {
    document.getElementById('timer_display').innerHTML = --secondsLeft

    if (secondsLeft <= 0)
    {
      document.getElementById('timer_display').innerHTML = 'Out of time'
      clearInterval(interval)
      gameTimer()
    }
  }, 1000)
}

function gameTimer () {
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
