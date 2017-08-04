let gamecardUniqueArray = [ "A", "N", "Q", "T", "6", "J", "M", "t", "o", "v", "R", "L", "A", "N", "Q", "T", "6", "J", "M", "t", "o", "v", "R", "L"];

// Below is a starting point for shuffling the cards - see Refs below
function shuffle(array) {
  var m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
}


let div = document.getElementById( "gameboard_wrapper" );

for (let i=0; i < gamecardUniqueArray.length; i++){
  let label = document.createElement("label");
  label.classList.add( gamecardUniqueArray[ i ] );
  label.classList.add( "facedown");
  label.addEventListener('click',Fliptofaceup)

  let icon = document.createTextNode(gamecardUniqueArray[i]);
  label.innerText = icon.textContent;

  div.appendChild( label );
}


// Adding a "click" event listener to "label"
let label = document.getElementsByTagName( 'label' );
let pairArray = [];


function Fliptofaceup(i){
  this.classList.toggle("faceup");
        // push.pairArray(label.innerText);
        // setTimeout
  this.classList.toggle("facedown");
  }

  // pairArray.push(event.target.innerText[i]);
  // return pairArray;

// console.log(pairArray);




/*if (letPlayerDoSomething == true)       << Lyman susggested this is useful */

//
//
//       {
//
//
// }
//
//
//
//
//







































// References

// Read about a class shuffle function, the Fisher-Yates Shuffle, here - https://bost.ocks.org/mike/shuffle/ Copy their 3rd suggestion to get started on something.

// Changing text of a <span>
// span = document.getElementById("myspan");
// txt = document.createTextNode("your cool text");
// span.innerText = txt.textContent;
//


// setTimeout(function() {
//     console.log("This was delayed by one second!");
// }, 5000);
//
// function foo(b) {
//   // setTimeout(foo, 5000);
//   var a = 10;
//   return a + b + 11;//I want this line to be delayed in printing....
// }
//
// function bar(x) {
//   // setTimeout(foo, 5000);
//   var y = 3;
//   console.log("bar has been initiated")
//   return foo(x * y);
// }
//
// console.log(bar(7));
// // How can I set a time delay between execution of  lines
