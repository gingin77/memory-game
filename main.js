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
  label.addEventListener('click', onClick); /* see function onClick below*/

  let icon = document.createTextNode(gamecardUniqueArray[i]);
  label.innerText = icon.textContent;

  div.appendChild( label );
 }

// The "click" event listener was added to "label" in the loop above.

// Next, define variables and write the function for what happens onFirstClick >>

  let label = document.getElementsByTagName( 'label' );
  let pairArray = [];
  // let arrayOfPairs = [];


function onClick(i){
  this.classList.remove("facedown");
  this.classList.add("faceup");
  // pairArray.push(event.target.innerText);

  console.log("A card has been flipped");
  pairArray.push(event.target.innerText);
  // I think I need to see if setting up a switch case break sequence could help here....
  console.log(pairArray);

  if (pairArray.length < 2){
    pairArray.push(event.target.innerText);
    console.log("A 2nd card has been flipped");
    console.log(pairArray);
  }
  else if(pairArray.length === 2) {
    // return comparePairs(pairArray);
    if(pairArray.length === 2 && (pairArray[0] === pairArray[1])){
      console.log("You've made a match!");
      // arrayOfPairs.push(pairArray);
      // console.log("here is the arrayOfPairs: " + (arrayOfPairs)); Leave these 2 lines. If the arrayOfPairs is going to be useful as a score card, then it needs to be structured as an array of arrays.....
      pairArray.pop();
      pairArray.shift();
      console.log(pairArray);
    }
    else /*if (pairArray.length === 2 && (pairArray[0] !== pairArray[1]))*/{
      console.log("No match!");
      pairArray.pop();
      pairArray.shift();
      console.log(pairArray);
      this.classList.remove("facedown");
      this.classList.add("faceup");
    }
  }
}


// function comparePairs(){
//   if(pairArray.length === 2 && (pairArray[0] === pairArray[1])){
//     console.log("You've made a match!");
//     // arrayOfPairs.push(pairArray);
//     // console.log("here is the arrayOfPairs: " + (arrayOfPairs)); Leave these 2 lines. If the arrayOfPairs is going to be useful as a score card, then it needs to be structured as an array of arrays.....
//     pairArray.pop();
//     pairArray.shift();
//     console.log(pairArray);
//   }
//   else /*if (pairArray.length === 2 && (pairArray[0] !== pairArray[1]))*/{
//     console.log("No match!");
//     pairArray.pop();
//     pairArray.shift();
//     console.log(pairArray);
//     this.classList.remove("facedown");
//     this.classList.add("faceup");
//   }
// }
//

// Comparison....



//
// function onFirstClick(i){

//   pairArray.push(event.target.innerText);
//   console.log("A card has been flipped");
//   console.log(pairArray);
//   label.addEventListener('click', onSecondClick);
//   console.log(label);
//   return label;
// }
//
// function onSecondClick(i) {
//   this.classList.remove("facedown");
//   this.classList.add("faceup");
//   pairArray.push(event.target.innerText);
//   console.log("A 2nd card has been flipped");
//   console.log(pairArray);
//
//       if(pairArray.length === 2 && (pairArray[0] === pairArray[1])){
//         console.log("You've made a match!");
//         // arrayOfPairs.push(pairArray);
//         // console.log("here is the arrayOfPairs: " + (arrayOfPairs)); Leave these 2 lines. If the arrayOfPairs is going to be useful as a score card, then it needs to be structured as an array of arrays.....
//         pairArray.pop();
//         pairArray.shift();
//         console.log(pairArray);
//
//       }
//
//       else if (pairArray.length === 2 && (pairArray[0] !== pairArray[1])){
//         console.log("No match!");
//         pairArray.pop();
//         pairArray.shift();
//         console.log(pairArray);
//       }
//   }
//






    // else
    //   // this.classList.remove("faceup");
    //   this.classList.toggle("facedown");
    //   pairArray.pop();
    //   pairArray.shift();
    //   console.log(pairArray);
    //   }
    //   else if (pairArray.length === 2 && (pairArray[0] !== pairArray[1])){
    //     console.log("You've made a match!");
    //     pairArray.pop();
    //     pairArray.shift();
    //     console.log(pairArray);
      // }



//
// if (pairArray.length < 2){
//   pairArray.push(event.target.innerText);
//   console.log("A card has been flipped");
//   console.log(pairArray);
//   }
//   else if(pairArray.length === 2 && (pairArray[0] !== pairArray[1])){
//     console.log("No match!");
//     // this.classList.remove("faceup");
//     this.classList.toggle("facedown");
//     pairArray.pop();
//     pairArray.shift();
//     console.log(pairArray);
//     }
//     else if (pairArray.length === 2 && (pairArray[0] === pairArray[1])){
//       console.log("You've made a match!");
//       pairArray.pop();
//       pairArray.shift();
//       console.log(pairArray);
//     }
// }





  /*else if (pairArray[0] !== pairArray[1]) {
  //   this.classList.remove("faceup");
  //   this.classList.add("facedown");
  // }*/
//   else if (pairArray.length === 2){
//
//       if (pairArray[0] === pairArray[1]){
//           console.log("You've made match!");
//       }else{

//       }
//   }
// }

// //     this.classList.toggle("facedown");/* I need to leave this in order to keep the Unique Icons transparent*/
// //  }
//
//
//
//
// /*if (letPlayerDoSomething == true)       << Lyman susggested this is useful */
//

//
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
