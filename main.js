let gamecardUniqueArray = [ "A", "N", "Q", "T", "6", "J", "M", "t", "o"]

let section = document.getElementById( "gameboard_wrapper" );
// let label = document.createElement("label");
//
// section.appendChild( label );



for (let i=0; i < gamecardUniqueArray.length; i++){
  let label = document.createElement("label");

  let input = document.createElement( "input" );
  let span1 = document.createElement( "span" );

  label.setAttribute( "type", "game title");
  span.setAttribute( "class", "game-card");

  let span2 = document.createElement( "span" );

  span2.setAttribute( "class", "gamecard-unique");

  label.appendChild( input );
  label.appendChild( span );

  section.append( label ); //I have no clue why this isn't letting me append... Instead of appendChild, I'm trying parent.append(); https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append

}


















// Below is a starting point for shuffling the cards
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


// Read about a class shuffle function, the Fisher-Yates Shuffle, here - https://bost.ocks.org/mike/shuffle/ Copy their 3rd suggestion to get started on something.
