// array containing quotes 
const quoteList = [
    'The way to get started is to quit talking and begin doing.',
    'Life is what happens when you\'re busy making other plans.',
    'The future belongs to those who believe in the beauty of their dreams.' ,
    'It is during our darkest moments that we must focus to see the light.',
    'What one man can invent another can discover.',
]; 

// array use for testing, can be ignored 
const quoteListz = [
  'asd', 
  'zxc',
];

// new array used to store the characters the user has typed
let quoteString = []; 

// var used to store the index of the current char user is typing 
let wordIndex = 0; 

// time the user started typing 
let startTime = Date.now(); 

// create vars holding info about UI elms 
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

/*
start logic: everything inside body is run when the elm with ID start
(in this case it's a button) is clicked 
*/
document.getElementById('start').addEventListener('click', () => {
    /*
    get a rnd quote :: 
    multiplies length of quoteList by a rnd number between 0 and 1
    takes that product and applies the floor method
    which gets the closest integer to that number, rounding down 
    */
    const rndQuoteIndex = Math.floor(Math.random() * quoteList.length); 

    // uses above int from rndQuoteIndex to select a rnd quote from quoteList
    const quote = quoteList[rndQuoteIndex];

    /*
    splits the string called quoteString acc to whitespace and returns an array with each word as an elm 
    */
    quoteString = quote.split(' ');

    // sets wordIndex to 0 so we can restart the game 
    wordIndex = 0; 

    // update page 

    /* 
    create an array of elements, each of which has the 'span' html tag applied to it. 
    this array will later be assigned a class 
    the map method takes an array and returns a second array with a function applied to every elm in the first array 
    the word inside function(word) refers to each elm as we iterate thru quoteString array
    EX: for word in quoteString 
    the {return `<span>...`} is the body text of function(word) 
    for each word in the array called quoteString we are returning it with 
    the html span tags added
    the backtick/tildas are an alternative way to concatenate 
    For more info, search template literals in onenote 
    */
    const spanWords = quoteString.map(function(word) { return `<span>${word} </span>`});

    /*
    spanWords is an array of strings, each wrapped/enclosed by html span tags 
    we join each elm in the array to make a long string
    sets the content of quoteElement as that string  
    see onenote/javascript/MS- innerHTML
    we use .innerHTML vs .innerText because .innerHTMl will return the enclosing
    span tags adn the enclosed text
    while .innerText will just give us the enclosed words 
    */
    quoteElement.innerHTML = spanWords.join(''); 

    /*
    highlights the node at index 0; see onenote for childNodes info 
    remember, quoteElm (prob) looks like this:
    <span>Start</span><span>of</span><span>quote</span>
    so we can use the childNode property to select a node since we have the span tags 
    */
    quoteElement.childNodes[0].className = 'highlight'; 

    // clear message text  
    messageElement.innerText = ''; 

    // clear input textbox of text 
    typedValueElement.value = ''; 

    // next, focus the textbox 
    typedValueElement.focus(); 

    //start the timer; startTime is set when user presses button 
    startTime = new Date().getTime(); 

    // change info text to let player know they can get a new quote 
    document.getElementById("info").textContent = "Press 'new' for a new quote!"

    // change button text to 'new' 
    document.getElementById("start").textContent = 'new';


}); 

typedValueElement.addEventListener('input', () => {

    // Get the current word from quote 
    const currentWord = quoteString[wordIndex];
    
    // get the current user input 
    const typedValue = typedValueElement.value;
  
    // Display (win) message if all words have been typed correctly 
    if (typedValue === currentWord && wordIndex === quoteString.length - 1) {

      // get elapsed time 
      const elapsedTime = new Date().getTime() - startTime;
      const message = ` ⭐Nice!⭐ You finished the game in ${elapsedTime / 1000} seconds.`;

      // set win message 
      messageElement.innerText = message;

    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {

      // end of word
      // clear the typedValueElement for the new word
      typedValueElement.value = '';

      // increment wordIndex
      wordIndex++;

      // delete class name for all elements in quote so highlighting will be removed 
      for (const wordElement of quoteElement.childNodes) {
        wordElement.className = '';
      }

      // highlight the next word
      quoteElement.childNodes[wordIndex].className = 'highlight';

    // if user input is a substring (from start) of current word in quote 
    } else if (currentWord.startsWith(typedValue)) {

      // highlight the next word
      typedValueElement.className = '';

      // change info text to let player know they can get a new quote 
      document.getElementById("info").textContent = "Press 'new' for a new quote!"

    // if user typed at least one wrong character 
    } else {

      // change input class to error 
      typedValueElement.className = 'error';
      
      // change info text to let user know they made a mistake 
      document.getElementById("info").textContent = " 😡 You made a mistake "

    }
  });
  