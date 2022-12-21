const gameContainer = document.getElementById("game");
let gameCount = 0;
let matchTries = 0;
let first;
let second;
const h1 = document.querySelector('h1');
const startButton = document.querySelector('#start');


let matchCounter = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
 
function createDivsForColors(colorArray) {
  
  for (let color of colorArray) {
    
    
   
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.style.backgroundColor = 'black';
    

  //   newDiv.setAttribute('data-divObj', JSON.stringify(divObj));
  //  console.log(newDiv.getAttribute('data-divObj'));

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    

    // append the div to the element with an id of game
    gameContainer.append(newDiv);

    
  }
  
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  
  let card = event.target;
 
  
  if(!first && !second){
    first = card;
    first.style.backgroundColor = card.className;
    first.style.pointerEvents = 'none';
    console.log(`${first.className} +++`)
    
  }
  else if (first && !second){
    second = card;
    card.style.backgroundColor = card.className;
    
    console.log(`${second.className} ---`)
    if(first.className === second.className){
      gameContainer.style.backgroundColor = 'pink';
      setTimeout(function(){
        gameContainer.style.backgroundColor = 'white';
      }, 500);
      gameCount++;
      console.log(gameCount);
      first.style.pointerEvents = 'none';
      second.style.pointerEvents = 'none';
      first = null;
      second = null;
      if(gameCount >= 5){
        const gameOverText = document.createElement('h1');
        gameOverText.innerText = "YOU WIN";
        gameOverText.style.textAlign = 'center';
        gameOverText.style.fontSize = '100px';
        gameContainer.replaceChildren(gameOverText);
        const restartButton = document.createElement('button');
        restartButton.innerText = 'RESTART';
        restartButton.addEventListener('click', function(){
          restartButton.remove();
          gameOverText.remove();
          gameCount = 0;
          createDivsForColors(shuffledColors);
        })
        
        gameContainer.append(restartButton);


      }
    }
    else{ setTimeout(function(){
   
      first.style.backgroundColor = 'black';    
      second.style.backgroundColor = 'black';
      first.style.pointerEvents = null;
      first = null;
      second = null;
    }, 1000);}
  }
 
 
    
 
    
    
    
   
  

}

// when the DOM loads
startButton.addEventListener('click', function(){
  startButton.remove();
  createDivsForColors(shuffledColors)});

