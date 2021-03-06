let deckOfMemoryCards = [
  ['P', 'images/paran_phone.png'],
  ['B', 'images/bracket_yinyang.png'],
  ['I', 'images/I_hand.png'],
  ['6', 'images/6_timer.png'],
  ['M', 'images/M_bomb.png'],
  ['A', 'images/A_peace_hand.png'],
  ['N', 'images/N_skull.png'],
  ['Q', 'images/Q_plane.png'],
  ['D', 'images/period_mailbox.png'],
  ['J', 'images/J_smile.png'],
  ['L', 'images/L_frown.png'],
  ['T', 'images/T_snowflake.png'],
  ['P', 'images/paran_phone.png'],
  ['B', 'images/bracket_yinyang.png'],
  ['I', 'images/I_hand.png'],
  ['6', 'images/6_timer.png'],
  ['M', 'images/M_bomb.png'],
  ['A', 'images/A_peace_hand.png'],
  ['N', 'images/N_skull.png'],
  ['Q', 'images/Q_plane.png'],
  ['D', 'images/period_mailbox.png'],
  ['J', 'images/J_smile.png'],
  ['L', 'images/L_frown.png'],
  ['T', 'images/T_snowflake.png']
]

let singleCard = ''
let cardImage = ''
let pairArray = []
let matchedCards = []
let gameTime = 150000
let symbolsInterval
let gameInterval
let winnersContainer

let gameboard = document.getElementById('gameboard_wrapper')
let headerContainer = document.getElementById('header_container')
let changingText = document.getElementById('timer_display')
let symbols = document.getElementById('symbols')

// hardcode the next 3 elements into the HTML file...
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

function rotateSymbols () {
  symbolsInterval = setInterval(function () {
    let twelveOClock = document.getElementById('one')
    let tenOClock = document.getElementById('two')
    let eightOClock = document.getElementById('seven')
    let sixOClock = document.getElementById('eight')
    let fourOClock = document.getElementById('five')
    let twoOClock = document.getElementById('four')

    twelveOClock.setAttribute('id', 'four')
    tenOClock.setAttribute('id', 'one')
    eightOClock.setAttribute('id', 'two')
    sixOClock.setAttribute('id', 'seven')
    fourOClock.setAttribute('id', 'eight')
    twoOClock.setAttribute('id', 'five')
  }, 1200)
}

function stopRotation () {
  clearInterval(symbolsInterval)
}

function gameStart (event) {
  removeStartFeatures()
  shuffle(deckOfMemoryCards)
  makeCards()
  displayTime()
  headerGameDisplay()
}

function removeStartFeatures () {
  stopRotation()
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

function displayTime () {
  let secondsLeft = gameTime / 1000
  gameInterval = setInterval(function () {
    changingText.innerHTML = --secondsLeft

    if (secondsLeft <= 0) {
      changingText.innerHTML = ''
      clearInterval(gameInterval)
      removeCards()
      centerMemLogo()
      gameboard.appendChild(textframe)
      spellGameOver()
      createScoreElement()
      playAgainButton()
    }
  }, 1000)
}

function headerGameDisplay () {
  changingText.innerText = ''
  headerContainer.classList.add('header_game_time')
  headerContainer.appendChild(changingText)
  symbols.remove(symbols)
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
  let nonMatchedElements = document.getElementsByClassName('not_yet_compared')

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
  gameWon(matchedCards)
}

function gameWon (matchedCards) {
  if (matchedCards.length === 24) {
    clearInterval(gameInterval)
    changingText.remove(changingText)
    removeCards()
    centerMemLogo()
    gameboard.appendChild(textframe)
    createScoreElement()
    coolWinnersDisplay()
    playAgainButton()
  }
}

function removeCards () {
  let cards = document.getElementsByClassName('singleCard')
  for (let i = cards.length - 1; i > -1; i--) {
    cards[i].parentNode.removeChild(cards[i])
  }
}

function centerMemLogo () {
  let logo = document.getElementById('Mem')
  let logoHolder = document.querySelector('.htag_holder')
  console.log(logo)
  console.log(logoHolder)
  logo.classList.add('mem_end_game')
  logoHolder.classList.remove('htag_holder')
  logoHolder.classList.add('htag_holder_end_game')
}

function spellGameOver () {
  let gameOverAlert = document.createElement('div')
  gameOverAlert.classList.add('game_over')
  gameOverAlert.innerText = 'Game over'
  textframe.appendChild(gameOverAlert)
}

function createScoreElement () {
  let matchScore = document.createElement('h3')
  matchScore.innerText = anyMatches()
  textframe.appendChild(matchScore)
}

function anyMatches () {
  let matches = matchedCards.length / 2
  if (matches === 0) {
    return "You didn't find any matches."
  } else if (matches === 1) {
    return 'You found 1 match.'
  } else if (matches >= 2 && matches < 12) {
    return 'You found ' + matches + ' matches!'
  } else if (matches === 12) {
    return 'Congratulations, you found all of the matches!!!!'
  }
}

// function playAgainMessage () {
//   let playAgainMessage = document.createElement('h3')
//   playAgainMessage.innerText = '\n\nIf you want to play again, refresh the page.'
//   textframe.appendChild(playAgainMessage)
// }

// let startButton = document.createElement('div')
//   textframe.appendChild(startButton)
//   startButton.classList.add('start_button')
//   startButton.addEventListener('click', gameStart)
//   startButton.innerText = 'Play'

function playAgainButton () {
  let playAgainButton = document.createElement('div')
  textframe.appendChild(playAgainButton)
  playAgainButton.classList.add('start_button')
  playAgainButton.innerText = 'Play Again'
  playAgainButton.addEventListener('click', newGame)
}

function newGame () {
  location.reload()
}

function coolWinnersDisplay () {
  winnersContainer = document.createElement('div')
  winnersContainer.setAttribute('id', 'winnersContainer')

  let iconNames = ['phone', 'yinyang', 'wave', 'timer', 'bomb', 'peaceFingers']
  let imagePaths = ['images/paran_phone.png', 'images/bracket_yinyang.png', 'images/I_hand.png', 'images/6_timer.png', 'images/M_bomb.png', 'images/A_peace_hand.png']

  for (let i = 0; i < iconNames.length; i++) {
    let phone = document.createElement('div')
    let yinyang = document.createElement('div')
    let wave = document.createElement('div')
    let timer = document.createElement('div')
    let bomb = document.createElement('div')
    let peaceFingers = document.createElement('div')

    let divElements = [phone, yinyang, wave, timer, bomb, peaceFingers]

    divElements[i].setAttribute('id', iconNames[i])
    iconNames[i] = document.createElement('img')
    iconNames[i].setAttribute('src', imagePaths[i])
    divElements[i].appendChild(iconNames[i])
    winnersContainer.appendChild(divElements[i])
  }
  textframe.appendChild(winnersContainer)
  startWinnersRotation()
}

function startWinnersRotation () {
  winnersInterval = setInterval(function () {
    let iconNames = ['phone', 'yinyang', 'wave', 'timer', 'bomb', 'peaceFingers']
    let phone = document.getElementById(iconNames[0])
    let yinyang = document.getElementById(iconNames[1])
    let wave = document.getElementById(iconNames[2])
    let timer = document.getElementById(iconNames[3])
    let bomb = document.getElementById(iconNames[4])
    let peaceFingers = document.getElementById(iconNames[5])

    phone.setAttribute('id', iconNames[1])
    yinyang.setAttribute('id', iconNames[2])
    wave.setAttribute('id', iconNames[3])
    timer.setAttribute('id', iconNames[4])
    bomb.setAttribute('id', iconNames[5])
    peaceFingers.setAttribute('id', iconNames[0])
  }, 1000)
}
