// array containing quotes 
const quoteList = [
    'The way to get started is to quit talking and begin doing',
    'Life is what happens when you\'re busy making other plans.',
    'The future belongs to those who believe in the beauty of their dreams.' ,
    'It is during our darkest moments that we must focus to see the light. ',
    'What one man can invent another can discover.',
]; 

// array use for testing, can be ignored 
const quoteList2 = [
  'a b c', 
  'd e f',
];

// new array used to store the characters the user has typed
let quoteString = []; 

// var used to store the index of the current char user is typing 
let wordIndex = 0; 

// time the user started typing 
let startTime = Date.now(); 

// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

// start logic
document.getElementById('start').addEventListener('click', () => {
    // get a rnd quote :: 
    // multiplies length of quoteList by a rnd number between 0 and 1
    // takes that product and applies the floor method
    // which gets the closest integer to that number, rounding down 
    const rndQuoteIndex = Math.floor(Math.random() * quoteList.length); 

    // uses above int from rndQuoteIndex to select a rnd quote from quoteList
    const quote = quoteList[rndQuoteIndex];

    // removes the leading and trailing single quotation marks from above quote
    quoteString = quote.split(' ');

    // sets wordIndex to 0 so we can restart the game 
    wordIndex = 0; 

    // update page 
    // create array of span elements so we can set a class later 
    const spanWords = quoteString.map(function(word) { return `<span>${word} </span>`});

    // convert into string and set as innerHTML on quote display 
    quoteElement.innerHTML = spanWords.join(''); 

    // highlights the 1st word 
    quoteElement.childNodes[0].className = 'highlight'; 

    // clear previous text 
    messageElement.innerText = ''; 

    // clear textbox of text 
    typedValueElement.value = ''; 

    // next, focus the textbox 
    typedValueElement.focus(); 

    //start the timer 
    startTime = new Date().getTime(); 
}); 

typedValueElement.addEventListener('input', () => {

    // Get the current word
    const currentWord = quoteString[wordIndex];
    
    // get the current value
    const typedValue = typedValueElement.value;
  
    if (typedValue === currentWord && wordIndex === quoteString.length - 1) {

      // end of sentence
      // Display success
      const elapsedTime = new Date().getTime() - startTime;
      const message = ` ⭐Nice!⭐ You finished the game in ${elapsedTime / 1000} seconds.`;
      messageElement.innerText = message;

    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {

      // end of word
      // clear the typedValueElement for the new word
      typedValueElement.value = '';

      // move to the next word
      wordIndex++;

      // reset the class name for all elements in quote
      for (const wordElement of quoteElement.childNodes) {
        wordElement.className = '';
      }

      // highlight the new word
      quoteElement.childNodes[wordIndex].className = 'highlight';

    } else if (currentWord.startsWith(typedValue)) {
      // currently correct
      // highlight the next word
      typedValueElement.className = '';
    } else {

      // error state
      typedValueElement.className = 'error';

    }
  });
  