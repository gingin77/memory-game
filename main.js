let gamecardUniqueArray = [ "A", "N", "Q", "T", "6", "J", "M", "t", "o", "v", "R", "L", "A", "N", "Q", "T", "6", "J", "M", "t", "o", "v", "R", "L"];

// Below is a starting point for shuffling the cards - see Refs below
function shuffle(array) {
  var m = array.length, t, i;

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
// console.log (shuffle(gamecardUniqueArray));


let div = document.getElementById( "gameboard_wrapper" );

for (let i=0; i < gamecardUniqueArray.length; i++){
  let label = document.createElement("label");
  label.classList.add( gamecardUniqueArray[ i ] );
  label.classList.add( "facedown");
  label.addEventListener('click',Fliptofaceup)

  // let span2 = document.createElement( "span" );
  // span2.setAttribute( "class", "gamecard-unique");

  let icon = document.createTextNode(gamecardUniqueArray[i]);
  label.innerText = icon.textContent;

  // label.appendChild( span2 );

  div.appendChild( label );
}



// Adding a "click" event listener to "label"
let label = document.getElementsByTagName( 'label' );


function Fliptofaceup(i){
  /*if (letPlayerDoSomething == true)*/{
  this.classList.toggle("faceup");
  // setTimeout
  this.classList.toggle("facedown");
}
}




// // Event listener code from Newline....
//
// var headerElement = document.getElementById("header");
//
// // Adding a "click" event listener to "header"
// headerElement.addEventListener("click", ourCallBack);
//
// // The "ourCallBack()" function is called whenever our declared event listener is triggered.
// function ourCallBack() {
//     if( headerElement.style.color === "red" ){
//         headerElement.style.color = "blue";
//     }else{
//         headerElement.style.color = "red";
//     }
// }
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
