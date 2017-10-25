//Create array to hold all the cards
 let cardsArray = [];
 $('.deck').find('li').each(function() {
 	cardsArray.push(this);
});
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//shuffle the list of cards using the "shuffle" method
shuffle(cardsArray);

//loop all the cards and add them to the page
for(let i = 0; i < cardsArray.length; i++) {
	$('.deck').append(cardsArray[i]);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

//create openCardsList array to hold open cards
let openCardsList = [];
let counter = 0;

//Event listener when a card is clicked
$('.card').on('click', function() {
	displayCard(this);
	AddOpenCard(this);
});

//function to display card symbol
function displayCard(card) {
	$(card).css('font-size', '30px');
}

//function to add open cards to list
function AddOpenCard(card) {
	//add card to open cards list
	openCardsList.push(card);

	//check if both open cards match
	if(openCardsList.length > 1) {
		if(openCardsList[0] === openCardsList[1]) {
			keepOpen(card);
			moves();
		} else {
			hideCard(card);
			moves();
		}
	}
}
