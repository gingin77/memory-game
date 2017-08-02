setTimeout(function() {
    console.log("This was delayed by one second!");
}, 5000);

function foo(b) {
  // setTimeout(foo, 5000);
  var a = 10;
  return a + b + 11;//I want this line to be delayed in printing....
}

function bar(x) {
  // setTimeout(foo, 5000);
  var y = 3;
  console.log("bar has been initiated")
  return foo(x * y);
}

console.log(bar(7));
// How can I set a time delay between execution of  lines


let gamecardUniqueArray = [ "A", "N", "Q", "T", "6", "J", "M", "t", "o"]

let div = document.getElementById( "gameboard_wrapper" );
// let label = document.createElement("label");
//
// section.appendChild( label );



for (let i=0; i < gamecardUniqueArray.length; i++){
  let label = document.createElement("label");

  let input = document.createElement( "input" );
  let span1 = document.createElement( "span" );

  input.setAttribute( "type", "checkbox" );
  label.setAttribute( "type", "game title");
  span1.setAttribute( "class", "game-card");

  let span2 = document.createElement( "span" );
  span2.setAttribute( "class", "gamecard-unique");

  let icon = document.createTextNode(gamecardUniqueArray[i]);

  span2.innerText = icon.textContent;

  span1.appendChild( span2 );



// span = document.getElementById("myspan");
// txt = document.createTextNode("your cool text");
// span.innerText = txt.textContent;
// https://stackoverflow.com/questions/1358810/how-do-i-change-the-text-of-a-span-element-in-javascript

  label.appendChild( input );
  label.appendChild( span1 );
  // console.log(label);

  div.appendChild( label ); //I have no clue why this isn't letting me append... Instead of appendChild, I'm trying parent.append(); https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append

}

















//
// // Below is a starting point for shuffling the cards
// function shuffle(array) {
//   var m = array.length, t, i;
//
//   // While there remain elements to shuffle…
//   while (m) {
//
//     // Pick a remaining element…
//     i = Math.floor(Math.random() * m--);
//
//     // And swap it with the current element.
//     t = array[m];
//     array[m] = array[i];
//     array[i] = t;
//   }
//
//   return array;
// }


// Read about a class shuffle function, the Fisher-Yates Shuffle, here - https://bost.ocks.org/mike/shuffle/ Copy their 3rd suggestion to get started on something.
