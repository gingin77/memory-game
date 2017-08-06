let gamecardUniqueArray = [ "A", "N", "Q", "T", "6", "J", "M", "t", "o", "v", "R", "L", "A", "N", "Q", "T", "6", "J", "M", "t", "o", "v", "R", "L"];

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

// Render elements to represent the cards
  let div = document.getElementById( "gameboard_wrapper" );

for (let i=0; i < gamecardUniqueArray.length; i++){
  let label = document.createElement("label");
  label.classList.add( gamecardUniqueArray[ i ] );
  label.classList.add( "facedown");
  label.addEventListener('click', onClick); /* see function onClick below... Can I have 2 functions triggered by the Event listener? */

  let icon = document.createTextNode(gamecardUniqueArray[i]);
  label.innerText = icon.textContent;

  div.appendChild( label );
 }

// The "click" event listener was added to "label" in the loop above.

// Next, define variables and write the function for what happens onClick

  let label = document.getElementsByTagName( 'label' );
  let pairArray = []; /* this array is to hold 2 cards until they get compared.*/
  let matchedCards = [];/* this array is to hold cards that have been matched and no longer have an eventlistener on them.*/


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
    console.log(pairArray[0].class);/* coming back as undefined*/
    console.log(pairArray[1].class);/* coming back as undefined*/
    comparePairs();
  }
}


// if (newArray.length === 2) {
//   checkEquality();
//
// newArray[0].removeEventListener('click', handleClick);
//     newArray[1].removeEventListener('click', handleClick);

function comparePairs(){
  if(pairArray[0].class === pairArray[1].class){
    console.log("You've made a match!");
    console.log(pairArray);

    matchedCards.push(pairArray[0], pairArray[1]);

    // function question4 () {
    //   let woodContaining = [];
    //   for  (let i=0; i < data.length; i++){
    //     if (data[i].materials.includes("wood")){ //can also be set-up by using a boolean; .includes === "wood"
    //       woodContaining.push(data[i].title);
    //     }
    //   } console.log(woodContaining.join('\r\n'));
    // }
    //

    for (let i=0; i < matchedCards.length; i++)
      if(matchedCards[i].class === ("faceup.not_yet_compared")){
        matchedCards.class.replace("faceup.not_yet_compared", "matched_already");
    }

// faceup.replace(/'faceup'/gi, "facedown")

    pairArray.pop();
    pairArray.shift();

    console.log(pairArray);
    console.log(matchedCards);





  }
  else{            /*equivalent to condition: (pairArray[0] !== pairArray[1])*/
    console.log("No match!");

    let cardsToFlipDown = [];
    console.log(cardsToFlipDown);
            // setTimeout
            // while (cardsToFlipDown.length > 0) {
            //   cardsToFlipDown[0].classList.add("facedown");
            //   cardsToFlipDown[0].classList.remove("faceup");
            // }
    pairArray.pop();
    pairArray.shift();
    console.log(pairArray);
    console.log(label);
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
