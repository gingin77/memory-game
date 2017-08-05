let gamecardUniqueArray = [ "A", "N", "Q", "T", "6", "J", "M", "t", "o", "v", "R", "L", "A", "N", "Q", "T", "6", "J", "M", "t", "o", "v", "R", "L"];

  // Below is a starting point for shuffling the cards - see Refs below
  function shuffle(array) {
   let m = array.length, t, i;

   // While there remain elements to shuffle…
   while (m) {

     // Pick a remaining element…
     i = Math.floor(Math.random() * m--);

     // And swap it with the current element.
     t = array[m];
     array[m] = array[i];
     array[i] = t;
   }
   return array;
 }
 console.log (shuffle(gamecardUniqueArray));



let div = document.getElementById( "gameboard_wrapper" );

for (let i=0; i < gamecardUniqueArray.length; i++){
  let label = document.createElement("label");
  label.classList.add( gamecardUniqueArray[ i ] );
  label.classList.add( "facedown");
  label.addEventListener('click', onFirstClick);

  let icon = document.createTextNode(gamecardUniqueArray[i]);
  label.innerText = icon.textContent;

  div.appendChild( label );
 }

// Adding a "click" event listener to "label"
  let label = document.getElementsByTagName( 'label' );
  let pairArray = [];
  let icons = 0; /* 2 icons need to go into the pairArray*/

function onFirstClick(i){
  this.classList.remove("facedown");
  this.classList.add("faceup");

  if (pairArray.length < 2){
    pairArray.push(event.target.innerText);
    console.log("A card has been flipped");
    console.log(pairArray);
      }else if (pairArray.length === 2 && (pairArray[0] === pairArray[1])){
        console.log("You've made a match!");
        pairArray.pop();
        pairArray.shift();
        console.log(pairArray);
      }else if(pairArray.length === 2 && (pairArray[0] !== pairArray[1])){
        console.log("No match!");
        this.classList.remove("faceup");
        this.classList.add("facedown");
        pairArray.pop();
        pairArray.shift();
        console.log(pairArray);
      }
}





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
//
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
