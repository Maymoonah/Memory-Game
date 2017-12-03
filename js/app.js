//Create array to hold all the cards
let cardsArray = [];
$('.deck').find('li').each(function() {
	cardsArray.push(this);
});

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
	let currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

//create variables and openCardsList array to hold open cards
let openCardsList = [];
let movesCounter = 0;
let timesClicked = 0;
let timer, sec;

//Event listener when a card is clicked
$('.card').on('click', function() {
	timesClicked++;
	displayCard(this);
	addOpenCard(this);
	//add card to openCardsList
	openCardsList.push(this);
	//start timer only after first click
	if(timesClicked === 1){
		gameTimer();
	}
	starRating();
});

//function to display card symbol
function displayCard(card) {
	$(card).addClass('open show');
}

//function to add open cards to a list
function addOpenCard(card) {
	//check if there are two cards in the list
	if(openCardsList.length === 2) {
		if(openCardsList[0].innerHTML === openCardsList[1].innerHTML) {
			//if cards match
			keepOpen(openCardsList);
			//if all cards are matched
			if($('.match').length === 16) {
				gameWon();
			}
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
	$(card).addClass('match');
	$(card).removeClass('open show');
}

//function to remove cards from open list
function hideCard(card) {
	$(card).removeClass('open show match');
}

//function to increment moves made by player
function moves() {
	movesCounter++;
	$('.moves').text(movesCounter);
}

function restartGame() {
	//hide cards
	$('.card').removeClass('open show match');
	//reset moves counter
	movesCounter = 0;
	$('.moves').text(movesCounter);
	//reset player name
	$('#name').val('');
	//shuffle cards
	shuffle(cardsArray);
	//append card to deck
	appendCards();
	//reset star rating
	$('.fa-star').css('color', '#ffe500');
	//reset timer
	resetTimer();
}

//restart game
$('.restart').on('click', restartGame);

//if all cards are matched, display message and final score
function gameWon() {
	let player = $('#name').val();
	let score = 100 - movesCounter;
	if(movesCounter === 8) {
		score = 100;
	}
	if($('li.match').length === 16) {
		alert(
			`Congratulations ${player}! Your Score: ${score}!`
			);
	}
	//stop timer
	stopTimer();
}

//Star rating
$('.fa-star').css('color', '#ffe500');
function starRating() {
	let numMoves = $('.moves').text();
	let stars = $('.fa-star');
	//if number of moves are between 9 and 15, change star rating to 2
	if(numMoves > 8 && numMoves <= 15) {
		stars.last().css('color', '#000');
	}
	//if number of moves is greater than 15, change rating to 1 star
	else if(numMoves > 15) {
		stars.css('color', '#000');
		stars.first().css('color', '#ffe500');
	}
}

//gameTimer function
function gameTimer() {
	//Stack overflow: https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
	sec = 0;
	function pad ( val ) { return val > 9 ? val : "0" + val; }
	timer = setInterval( function(){
	document.getElementById("timer").innerHTML= "Time Played: " +
	pad(parseInt(sec/60,10)) + ":" + pad(++sec%60);
	}, 1000);
}

//stop the game timer
function stopTimer() {
	clearInterval(timer);
}

//reset the game timer
function resetTimer() {
	sec = 0;
	clearInterval(timer);
	$('#timer').html('Time Played: 00:00');
	timesClicked = 0;
}