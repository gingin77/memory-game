let gamecardUniqueArray = [ 'A', 'N', 'Q', 'T', '6', 'J', 'M', 't', 'o', 'L', '[', '(', 'A', 'N', 'Q', 'T', '6', 'J', 'M', 't', 'o', 'L', '[', '(' ]

function shuffle (array) {
  let al = array.length
  let t = ''
  let i = ''
  while (al) {
    // perform an iteration until al > 0

    i = Math.floor(Math.random() * al--)
      // Assign 'i' the value of a random # based on the array length minus one.
      // 'i' will be less than or equal to 23 on the first iteration of the while loop.
      // With each iteration, 'al' decrements by 1.
      // Therefore, the random possibilites for 'i' reduce according to the reduction of 'al'.

    t = array[al]
        // 't' is set to equal the array position 'al', which will be the last position at the beginning of loop and the first position when the loop ends.

    array[al] = array[i]
      // The assignment relationship above is saying, the value at position 'al' will be set to the value at position 'i' (the random position), which for the first iteration is similar to saying, "move the random card that was picked to the end of the deck."

    array[i] = t
      // This last relationship replaces the value at position 'i' with the value at position 'al', based on 't' previously being assigned to 'array[al]'.
      // The last 2 lines serve to swap out the randomly picked card with the card at position 'al' and since 'al' decrements with each iteration of the array, the non-random, exchanged card progresses from being in position 23 to postion 0.
  }
  return array
      // The array is returned after the while loop altered the arrangement of items within the array. Note, only a single array was used. There was not an exchange of values between 2 independent arrays.
}

shuffle(gamecardUniqueArray)

// Render elements to represent the gameboard wrapper, which will hold the cards after the start button goes away.
let div = document.getElementById('gameboard_wrapper')
div.setAttribute('class', 'gameboard_wrapper_solid')
// the class = 'gameboard_wrapper_solid' is associated with the start button

// Start screen features include game start button, instruction message and eventlistener
  let start_button = document.createElement('div')
  div.appendChild(start_button)
  start_button.classList.add( 'start_button' );
  start_button.addEventListener('click', gameStart);
      let button_text = document.createTextNode( 'Play');
      start_button.innerText = 'Play';

  let game_directions = document.createElement( 'h3' );
      game_directions.innerText = 'Hit play to start the game timer!'
      div.appendChild(game_directions);

//^^ All start frame elements have now been rendered. Next, write functions
// for gameTimer and for loading the game (function gameStart) and the timer for the game (setTimeout)


function gameStart(){ /*need to remove button and span text; switch the class on the div */
  start_button.remove(start_button);
  game_directions.remove(game_directions);
  console.log('The start features have been removed');

  div.classList.remove( 'gameboard_wrapper_solid' );
  div.classList.add( 'gameboard_wrapper' );

// Render elements to represent the cards with a for loop
      for (let i=0; i < gamecardUniqueArray.length; i++){
        let label = document.createElement('label');
        label.classList.add( gamecardUniqueArray[ i ] );
        label.classList.add( 'facedown');
        label.addEventListener('click', onClick);

        let icon = document.createTextNode(gamecardUniqueArray[i]);
        label.innerText = icon.textContent;

        div.appendChild( label );
       }

       let gameTimer = setTimeout(function(){
         let end_of_game = document.createElement( 'span' );
             end_of_game.innerText = 'Game over';
             div.appendChild(game_directions);

             let card_deck = document.getElementsByTagName( 'label' );
             console.log(typeof card_deck);
             console.log( card_deck );
             //  cards.Nodelistremove(cards); //removes cards//





             let i=0;
             while (i < card_deck.length){
               card_deck.length[i].parentNode.removeChild(card_deck.length[i]);
               i++;
             }//Uncaught TypeError: Cannot read property 'parentNode' of undefined at main.js:74



            //  while (cards < card_deck.length){
            //    cards[i].parentNode.removeChild(cards[i]);
            //    cards++;
              //  Uncaught ReferenceError: i is not defined

       }, 5000);/*Give player 180,000 ms but leave at 30,000 while troubleshooting*/
  }

// The 'click' event listener was added to 'label' in the loop above.
// Next, define variables and write the function for what happens onClick

  let pairArray = []; /* this array is to hold 2 cards until they get compared.*/
  let matchedCards = [];/* this array is to hold cards that have been matched and no longer have an eventlistener on them. class should be 'leave_faceup'*/

function onClick(i){ /*rename onFirstClick*/
  console.log('A card has been flipped');
  console.log(event.target);

  event.target.classList.remove('facedown');
  event.target.classList.add('faceup');
  event.target.classList.add('not_yet_compared');
  event.target.removeEventListener('click', onClick);
  pairArray.push(event.target);

  console.log(pairArray); /*the first click gets me to here when .length is set to ===2.*/

  if (pairArray.length === 2){
    console.log('A 2nd card has been flipped');
    console.log(pairArray[0].innerText);/* coming back as undefined when '.class', changed to '.innterText'   */
    console.log(pairArray[1].innerText);
    comparePairs();
  }
}


function comparePairs () {
  if (pairArray[0].innerText === pairArray[1].innerText) {
    console.log(pairArray)
    matchedCards.push(pairArray[0], pairArray[1])
    console.log("You've made a match!")

    let matchedElements = (document.getElementsByClassName('not_yet_compared'));
    console.log(matchedElements);

    matchedElements[0].classList.remove('faceup');
    matchedElements[0].classList.add('leave_faceup');
    matchedElements[1].classList.remove('faceup');
    matchedElements[1].classList.add('leave_faceup');

    matchedElements[1].classList.remove('not_yet_compared');
    matchedElements[0].classList.remove('not_yet_compared');

    console.log(matchedElements);

    pairArray.pop();
    pairArray.shift();
    console.log(pairArray);

    console.log('The matched cards array should now list accumulating matches: ',(matchedCards));
  }else{            /*equivalent to condition: (pairArray[0] !== pairArray[1])*/
    console.log('No match!');

    pairArray.pop();
    pairArray.shift();
    console.log(pairArray);

    let non_matchedElements =(document.getElementsByClassName('not_yet_compared'));
    console.log(non_matchedElements);

    let delay = 1500 /*time for player to see the card face on mismatched cards*/
    setTimeout (function(){
      non_matchedElements[0].addEventListener('click', onClick);
      non_matchedElements[1].addEventListener('click', onClick);


      non_matchedElements[0].classList.remove('faceup');
      non_matchedElements[0].classList.add('facedown');
      non_matchedElements[1].classList.remove('faceup');
      non_matchedElements[1].classList.add('facedown');
      non_matchedElements[1].classList.remove('not_yet_compared');
      non_matchedElements[0].classList.remove('not_yet_compared');

      console.log('The non-matched cards array should now be empty: ', (non_matchedElements));
    }, delay);
  }
}
