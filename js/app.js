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
//append cards to deck using append method
appendCards();

//loop through all the cards and add them to the webpage
function appendCards() {
	for(let i = 0; i < cardsArray.length; i++) {
	$('.deck').append(cardsArray[i]);
	}
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
let openCardsList = [], keepCardsOpen = [];
let counter = 0;

//Event listener when a card is clicked
$('.card').on('click', function() {
	displayCard(this);
	addOpenCard(this);
	//add card to open cards list
	openCardsList.push(this);
});

//function to display card symbol
function displayCard(card) {
	$(card).addClass('open show');
}

//function to add open cards to a list
function addOpenCard(card) {;
	//check if there are two cards in the list
	if(openCardsList.length === 2) {
		if(openCardsList[0].innerHTML === openCardsList[1].innerHTML) {
			//if cards match
			keepOpen(openCardsList);
			//if all cards are matched
			allMatched();
		} else {
			//if cards don't match
			hideCard(openCardsList);
		}
		openCardsList.splice(0, 2);
		moves();
	}
}

//function to lock cards in open position
function keepOpen(card) {
	$(card).removeClass('open show');
	$(card).addClass('match');
}

//function to remove cards from open list
function hideCard(card) {
	$(card).removeClass('open show match noMatch');
}

//function to increment moves made by player
function moves() {
	counter++;
	$('.moves').text(counter);
}

function restartGame() {
	$('.card').each(function() {
		hideCard();
	});
	counter = 0;
	$('.moves').text(counter);
	//shuffle cards
	shuffle(cardsArray);
	//append card to deck
	appendCards();
}
//restart game
$('.restart').on('click', restartGame);

//if all cards are matched, display message and final score
function allMatched() {
	let player = $('#name').val();
	if($('li.match').length === 16) {
		alert(
			`Congratulations ${player}! Your Score: 15`  
			);
	}
}