let deckOfMemoryCards = [
  ['Q', 'images/Q_plane.png'],
  ['D', 'images/period_mailbox.png'],
  ['P', 'images/paran_phone.png'],
  ['N', 'images/N_skull.png'],
  ['6', 'images/6_timer.png'],
  ['A', 'images/A_peace_hand.png'],
  ['I', 'images/I_hand.png'],
  ['J', 'images/J_smile.png'],
  ['L', 'images/L_frown.png'],
  ['T', 'images/T_snowflake.png'],
  ['B', 'images/bracket_yinyang.png'],
  ['M', 'images/M_bomb.png'],
  ['Q', 'images/Q_plane.png'],
  ['D', 'images/period_mailbox.png'],
  ['P', 'images/paran_phone.png'],
  ['N', 'images/N_skull.png'],
  ['6', 'images/6_timer.png'],
  ['A', 'images/A_peace_hand.png'],
  ['I', 'images/I_hand.png'],
  ['J', 'images/J_smile.png'],
  ['L', 'images/L_frown.png'],
  ['T', 'images/T_snowflake.png'],
  ['B', 'images/bracket_yinyang.png'],
  ['M', 'images/M_bomb.png']
]

let singleCard = ''
let cardImage = ''
let pairArray = []
let matchedCards = []
let gameTime = 5000

let gameboard = document.getElementById('gameboard_wrapper')
let headerContainer = document.getElementById('header_container')
let changingText = document.getElementById('timer_display')
let symbols = document.getElementById('symbols')

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
  headerGameDisplay()
}

function headerGameDisplay () {
  changingText.innerText = ''
  headerContainer.classList.add('header_game_time')
  // changingText.classList.add('header_game_time_text')
  headerContainer.appendChild(changingText)

  symbols.remove(symbols)
}

function removeStartFeatures () {
  startButton.remove(startButton)
  gameDirections.remove(gameDirections)
  gameboard.classList.remove('gameboard_wrapper_at_start')
  textframe.remove(textframe)
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
    singleCard.classList.add(deckOfMemoryCards[i][0])
    singleCard.classList.add('facedown', 'singleCard')
    singleCard.addEventListener('click', onClick)

    cardImage = document.createElement('img')
    cardImage.setAttribute('src', (deckOfMemoryCards[i][1]))
    cardImage.classList.add('facedown_image')
    singleCard.appendChild(cardImage)
    gameboard.appendChild(singleCard)
  }
}

function onClick (i) {
  let clickedCard = event.target
  clickedCard.classList.remove('facedown')
  clickedCard.classList.add('faceup', 'not_yet_compared')

  let childImage = clickedCard.childNodes[0]
  childImage.classList.remove('facedown_image')
  childImage.classList.add('faceup_image')
  clickedCard.removeEventListener('click', onClick)
  pairArray.push(clickedCard)

  if (pairArray.length === 2) {
    comparePairs()
  }
}

function comparePairs () {
  console.log(pairArray[0].className[0])
  console.log(pairArray[1].className[0])
  if (pairArray[0].className[0] === pairArray[1].className[0]) {
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

    let childImageA = nonMatchedElements[0].childNodes[0]
    let childImageB = nonMatchedElements[1].childNodes[0]

    nonMatchedElements[0].classList.remove('faceup')
    nonMatchedElements[0].classList.add('facedown')
    childImageA.classList.remove('faceup_image')
    childImageA.classList.add('facedown_image')

    nonMatchedElements[1].classList.remove('faceup')
    nonMatchedElements[1].classList.add('facedown')
    childImageB.classList.remove('faceup_image')
    childImageB.classList.add('facedown_image')

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
    changingText.innerHTML = --secondsLeft

    if (secondsLeft <= 0)
    {
      changingText.innerHTML = 'out of time'
      clearInterval(interval)
      gameOverDisplay()
    }
  }, 1000)
}

function gameOverDisplay () {
  let cards = document.getElementsByClassName('singleCard')
  for (let i = cards.length - 1; i > -1; i--) {
    cards[i].parentNode.removeChild(cards[i])
  }
  gameboard.appendChild(textframe)

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
