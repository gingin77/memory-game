let gamecardUniqueArray = [ "A", "N", "Q", "T", "6", "J", "M", "t", "o", "L", "[", "(", "A", "N", "Q", "T", "6", "J", "M", "t", "o", "L", "[", "(" ];

// Function to shuffle the cards - see Refs below
function shuffle(array) {
   let m = array.length, t, i;
   while (m) {
     i = Math.floor(Math.random() * m--);
     t = array[m];
     array[m] = array[i];
     array[i] = t;
   }
   return array;
 }
 console.log (shuffle(gamecardUniqueArray));



// Render elements to represent the gameboard wrapper, which will hold the
// cards after the start button goes away.

  let div = document.getElementById( "gameboard_wrapper" );
  div.setAttribute("class", "gameboard_wrapper_solid");
  //the class = "gameboard_wrapper_solid" is associated with the start button

//Start screen features include game start button, instruction message and eventlistener
  let start_button = document.createElement( "div" );
  div.appendChild( start_button );
  start_button.classList.add( "start_button" );
  start_button.addEventListener('click', gameStart);
      let button_text = document.createTextNode( "Play");
      start_button.innerText = "Play";

  let game_directions = document.createElement( "h3" );
      game_directions.innerText = "Hit play to start the game timer!"
      div.appendChild(game_directions);

//^^ All start frame elements have now been rendered. Next, write functions
// for gameTimer and for loading the game (function gameStart) and the timer for the game (setTimeout)


function gameStart(){ /*need to remove button and span text; switch the class on the div */
  start_button.remove(start_button);
  game_directions.remove(game_directions);
  console.log("The start features have been removed");

  div.classList.remove( "gameboard_wrapper_solid" );
  div.classList.add( "gameboard_wrapper" );

// Render elements to represent the cards with a for loop
      for (let i=0; i < gamecardUniqueArray.length; i++){
        let label = document.createElement("label");
        label.classList.add( gamecardUniqueArray[ i ] );
        label.classList.add( "facedown");
        label.addEventListener('click', onClick);

        let icon = document.createTextNode(gamecardUniqueArray[i]);
        label.innerText = icon.textContent;

        div.appendChild( label );
       }

       let gameTimer = setTimeout(function(){
         let end_of_game = document.createElement( "h2" );
             end_of_game.innerText = "Game over";
             div.appendChild(end_of_game);

             let parentDiv = document.getElementById( "gameboard_wrapper" );
             console.log( parentDiv );
             console.log(typeof parentDiv);
             let cards = div.querySelectorAll ( "label" );
             console.log(typeof cards);
             console.log( cards );
            //  cards.Nodelistremove(cards); //removes cards//
            //  div.removeChild.remove( cards );

            //  for (let i=cards.length; i>=0; i--){
            //     cards[i].parentDiv.removeChild(cards[i]);
            //   }

            // parentDiv.documentElement.removeChild(cards); Uncaught TypeError: Cannot read property 'removeChild' of undefined

            // div.removeChild(cards);Uncaught TypeError: Failed to execute 'removeChild' on 'Node': parameter 1 is not of type 'Node'.

             for (let i=cards.length-1; i > -1; i--){
                cards[i].parentNode.removeChild(cards[i])
              }

              // ^^THIS KILLS THE WHOLE DECK - FINALLY!!!!!





       }, 100000);/*Give player 120,000 ms but leave at 30,000 while troubleshooting*/
  }

// The "click" event listener was added to "label" in the loop above.
// Next, define variables and write the function for what happens onClick

  let pairArray = []; /* this array is to hold 2 cards until they get compared.*/
  let matchedCards = [];/* this array is to hold cards that have been matched and no longer have an eventlistener on them. class should be "leave_faceup"*/

function onClick(i){ /*rename onFirstClick*/
  console.log("A card has been flipped");
  console.log(event.target);

  event.target.classList.remove("facedown");
  event.target.classList.add("faceup");
  event.target.classList.add("not_yet_compared");
  event.target.removeEventListener('click', onClick);
  pairArray.push(event.target);

  console.log(pairArray); /*the first click gets me to here when .length is set to ===2.*/

  if (pairArray.length === 2){
    console.log("A 2nd card has been flipped");
    console.log(pairArray[0].innerText);/* coming back as undefined when '.class', changed to '.innterText'   */
    console.log(pairArray[1].innerText);
    comparePairs();
  }
}


function comparePairs(){
  if(pairArray[0].innerText === pairArray[1].innerText){
    console.log(pairArray);
    matchedCards.push(pairArray[0],pairArray[1]);
    console.log("You've made a match!");

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

    console.log("The matched cards array should now list accumulating matches: ",(matchedCards));
  }else{            /*equivalent to condition: (pairArray[0] !== pairArray[1])*/
    console.log("No match!");

    pairArray.pop();
    pairArray.shift();
    console.log(pairArray);

    let non_matchedElements =(document.getElementsByClassName('not_yet_compared'));
    console.log(non_matchedElements);

    // let delay = 1000 /*time for player to see the card face on mismatched cards*/
    setTimeout (function(){
      non_matchedElements[0].addEventListener('click', onClick);
      non_matchedElements[1].addEventListener('click', onClick);


      non_matchedElements[0].classList.remove('faceup');
      non_matchedElements[0].classList.add('facedown');
      non_matchedElements[1].classList.remove('faceup');
      non_matchedElements[1].classList.add('facedown');
      non_matchedElements[1].classList.remove('not_yet_compared');
      non_matchedElements[0].classList.remove('not_yet_compared');

      console.log("The non-matched cards array should now be empty: ", (non_matchedElements));
    }, 1000);
  }
}



    // label = [].slice.call(document.getElementsByTagName('label'));
    // console.log(label);

    // for (i=0; i < cardsToFlipDown.length; i++){
    //   for (let item of cardsToFlipDown) {
    //       log(item.class);
    // }
    // console.log(cardsToFlipDown);


//     let cardsToFlipDown = Array.from(label.getElementsByClassName("faceup")).forEach(function(item) {
//    console.log(item.id);
//
//
//     [].slice.call(label.getElementsByClassName( 'faceup' ));
//     console.log(cardsToFlipDown);
//
//
// });
      // something from a stackoverflow example I've just been trying to adapt.
      // https://stackoverflow.com/questions/31311815/how-to-change-class-for-all-elements-retrieved-by-document-getelementsbyclassnam
      // alert("before: " + cardsToFlipDown.length);
      // cardsToFlipDown[0].className='facedown';
      // alert("after: " + cardsToFlipDown.length);

    // console.log(cardsToFlipDown);

      // Debug victory - Figured out that querySelectorAll generates a nodes collection, not an array. The code below converts to an array. Unfortunately, all functions I wrote with remove or replace lead to other error messages. :[

      // let cardsToFlipDown = [].slice.call(document.querySelectorAll(".faceup"));
      // console.log(cardsToFlipDown);

      // I tried using classList.remove after converting nodes collection to array

      // let flippedBackCards = cardsToFlipDown.classList.remove( "faceup");
      // flippedBackCards = cardsToFlipDown.classList.add( "facedown");
    //   Error message associated with the above lines: Uncaught TypeError: Cannot read property 'remove' of undefined
    // at comparePairs (main.js:79)
    // at HTMLLabelElement.onClick (main.js:54)

      // let flippedBackCards = cardsToFlipDown.replace(".faceup", ".facedown");
      // The error message I got here was - Uncaught TypeError: cardsToFlipDown.replace is not a function.

      // flippedBackCards = cardsToFlipDown.map(function(faceup){
      //   return faceup.replace(/'faceup'/gi, "facedown")
      // });
      // Uncaught TypeError: faceup.replace is not a function

      // console.log(flippedBackCards);



// // References
//
// // Read about a class shuffle function, the Fisher-Yates Shuffle, here - https://bost.ocks.org/mike/shuffle/ Copy their 3rd suggestion to get started on something.
//
// // Changing text of a <span>
// // span = document.getElementById("myspan");
// // txt = document.createTextNode("your cool text");
// // span.innerText = txt.textContent;
// //
// Use the EventLoop documentation here - https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop
//
// // setTimeout(function() {
// //     console.log("This was delayed by one second!");
// // }, 5000);
// //
// // function foo(b) {
// //   // setTimeout(foo, 5000);
// //   var a = 10;
// //   return a + b + 11;//I want this line to be delayed in printing....
// // }
// //
// // function bar(x) {
// //   // setTimeout(foo, 5000);
// //   var y = 3;
// //   console.log("bar has been initiated")
// //   return foo(x * y);
// // }
// //
// // console.log(bar(7));
// // // How can I set a time delay between execution of  lines
//
//
//
//
//   // while (icons < 2) { DON'T use an iterator here
//   //     pairArray.push(event.target.innerText);
//   //         // setTimeout


// arrayOfPairs.push(pairArray);
// console.log("here is the arrayOfPairs: " + (arrayOfPairs)); Leave these 2 lines. If the arrayOfPairs is going to be useful as a score card, then it needs to be structured as an array of arrays.....




    //Code that failed when trying to get cards to switch classes.

    // let matchedElements = (document.getElementsByClassName('not_yet_compared'));

  // pairArray.map(function(flip){
  //   if (innerHTML = "not_yet_compared"){
  //     replace('faceup','facedown');
  //   }
  // }
  //
  // console.log(pairArray);

  // matchedCards.push(pairArray[0], pairArray[1]);
  //
  //
    // matchedElements[0].classList.remove('faceup')
    //
    //
    // // // matchedElements.map('not_yet_compared');
    // //
    // //
    // console.log(matchedCards);
    // //
// console.log(typeof pairArray[i]);
  //
  // function replace(){
  //   if("faceup.not_yet_compared"){
  //     return replace("faceup.not_yet_compared","leave_faceup");
  //   }
  // }
  //   for (let i=0; i < pairArray.length; i++)
  //     if(pairArray[i].includes = "faceup.not_yet_compared"){
  //       pairArray[i].replace("faceup.not_yet_compared","leave_faceup");
  //   }

// faceup.replace(/'faceup'/gi, "facedown")

// <!--elements for testing the transform/rotateY style -->
// <!-- <p>foo</p>
// <p class="transformed">bar</p>

// https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateY -->
