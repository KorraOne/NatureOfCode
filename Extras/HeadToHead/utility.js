// let topics = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

// let topics = [
// 	"Spaghetti Bolognese",
// 	"Chicken Alfredo",
// 	"Tacos",
// 	"Hamburgers",
// 	"Grilled Cheese Sandwich",
// 	"Caesar Salad",
// 	"Pizza Margherita",
// 	"Beef Stew",
// 	"Fried Rice",
// 	"Chicken Curry",
// 	"Pancakes",
// 	"Lasagna",
// 	"Fish and Chips",
// 	"Chicken Stir Fry",
// 	"Beef Tacos",
// 	"Vegetable Soup",
// 	"Shrimp Scampi",
// 	"Chicken Parmesan",
// 	"Beef Burritos",
// 	"Eggs Benedict",
// 	"BBQ Ribs",
// 	"Macaroni and Cheese",
// 	"Chicken Quesadilla",
// 	"Pulled Pork Sandwich",
// 	"Chicken Tikka Masala",
// 	"Pad Thai",
// 	"Egg Fried Rice",
// 	"Shepherd's Pie",
// 	"Roast Chicken",
// 	"Beef Chili"
// ];

function generateNumberStrings(amount) {
	const numberStrings = [];
	for (let i = 1; i <= amount; i++) {
			numberStrings.push(i.toString());
	}
	return numberStrings;
}

// Example usages
const amount = 10;
const topics = generateNumberStrings(amount);
console.log(topics);


let ratings = {};
let appearances = {};
let count = 0;
const K = 500; // K-factor for Elo rating adjustments

topics.forEach(topic => {
	ratings[topic] = 0;
	appearances[topic] = 0;
});

function getRandomPair() {
	let [topic1, topic2] = [];
	while (!topic1 || !topic2 || topic1 === topic2) {
		topic1 = topics[Math.floor(Math.random() * topics.length)];
		topic2 = topics[Math.floor(Math.random() * topics.length)];
	}
	return [topic1, topic2];
}

function updateComparison() {
	const [left, right] = getRandomPair();
	document.getElementById('leftTopic').innerText = left;
	document.getElementById('rightTopic').innerText = right;
	document.getElementById('leftTopic').setAttribute('data-topic', left);
	document.getElementById('rightTopic').setAttribute('data-topic', right);

	appearances[left]++;
	appearances[right]++;
}

function calculateElo(winnerRating, loserRating) {
	const expectedScoreWinner = 1 / (1 + Math.pow(10, (loserRating - winnerRating) / 400));
	const expectedScoreLoser = 1 - expectedScoreWinner;
	const newWinnerRating = winnerRating + K * (1 - expectedScoreWinner);
	const newLoserRating = loserRating + K * (0 - expectedScoreLoser);
	return [newWinnerRating, newLoserRating];
}

function simulate() {
	let sorted = false;
	while (!sorted) {
		console.log("loop");
		count++;

		const leftTopic = Number(document.getElementById('leftTopic').getAttribute('data-topic'));
		const rightTopic = Number(document.getElementById('rightTopic').getAttribute('data-topic'));

		const selectedTopic = leftTopic <= rightTopic ? leftTopic : rightTopic;
		const otherTopic = selectedTopic === leftTopic ? rightTopic : leftTopic;

		const [newWinnerRating, newLoserRating] = calculateElo(ratings[selectedTopic], ratings[otherTopic]);
		ratings[selectedTopic] = newWinnerRating;
		ratings[otherTopic] = newLoserRating;
		
		updateComparison();
		updateRanking();

		const sortedTopics = Object.keys(ratings).sort((a, b) => ratings[b] - ratings[a]);
		let match = 0;
		sortedTopics.forEach((topic, index) => {
			if (index + 1 == Number(topic)) {
				match++;
			}
		});
		if (match == topics.length) {
			sorted = true;
		}

	}
	console.log(count);
}

function selectTopic(side) {
	const leftTopic = Number(document.getElementById('leftTopic').getAttribute('data-topic'));
	const rightTopic = Number(document.getElementById('rightTopic').getAttribute('data-topic'));

	const selectedTopic = document.getElementById(`${side}Topic`).getAttribute('data-topic');
	// const selectedTopic = leftTopic <= rightTopic ? leftTopic : rightTopic;
	const otherTopic = selectedTopic === leftTopic ? rightTopic : leftTopic;
	
	// Calculate new ratings
	// const [newWinnerRating, newLoserRating] = calculateElo(ratings[selectedTopic], ratings[otherTopic]);
	const [newWinnerRating, newLoserRating] = calculateElo(selectedTopic, otherTopic);
	ratings[selectedTopic] = newWinnerRating;
	ratings[otherTopic] = newLoserRating;
	
	updateComparison();
	updateRanking();
}

function updateRanking() {
	const sortedTopics = Object.keys(ratings).sort((a, b) => ratings[b] - ratings[a]);
	const rankingDiv = document.getElementById('ranking');
	rankingDiv.innerHTML = "<h2>Ranked Topics</h2>";
	sortedTopics.forEach((topic, index) => {
		rankingDiv.innerHTML += `<p>${index + 1}. ${topic}. ${Math.round(ratings[topic])} points (appeared ${appearances[topic]} times)</p>`;
	});
}

function addTopic() {
	const topicName = prompt("Enter the new topic name:");
	if (topicName) {
		topics.push(topicName);
		ratings[topicName] = 0;
		appearances[topicName] = 0;
	} else {
		alert('Failed to add topic. Please try again.');
	}
}

// Initialize the first comparison
updateComparison();
updateRanking();
// simulate();
