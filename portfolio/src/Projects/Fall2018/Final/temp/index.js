//Sets when game.html loads
var currentUser;
var currentEquation;
const idNum1 = document.getElementById("num1");
const idNum2 = document.getElementById("num2");
const idSign = document.getElementById("sign");
const idTimer = document.getElementById("timer");
const idAttempts = document.getElementById("attempts");
const idEqNum = document.getElementById("eqNum");
const idUser = document.getElementById("user");
const idInput = document.getElementById("input");
//Game Functions
//Setup Functions
function getAnswer(num1, num2, sign) {
	if (sign === "+") {
		return num1 + num2;
	} else if (sign === "-") {
		return num1 - num2;
	} else if (sign === "*") { 
		return num1 * num2;
	} else {
	console.log("Cannot calculate.");
	}
}

function newGame() {
	currentEquation = sessionStorage.getItem("eqNum");
	currentUser = sessionStorage.getItem("user");
	setNums();
}
function setNums() {
	var eq = currentEquation;
	var gameInfo = getLocalStorage();
console.log("setNums() num1 = " + gameInfo[eq].num1);
	idNum1.innerHTML = String(gameInfo[eq].num1);
	idNum2.innerHTML = String(gameInfo[eq].num2);
	idSign.innerHTML = String(gameInfo[eq].sign);
	idAttempts.innerHTML = 4;
	idTimer.innerHTML = 30;
}

function checkAnswer() {
	var eq = currentEquation;
	var gameInfo = getLocalStorage();
console.log(gameInfo[eq].num1);
	var answer = Number(gameInfo[eq].answer);
	var attempts = Number(idAttempts.innerHTML);
	var score = Number(gameInfo[eq].score);
	var input = Number(idInput.value);
	var time = Number(checkTime());
	if (answer === input) {
		console.log("Good job!");
		idInput.value = "";
		score = time + attempts;
		gameInfo[eq].score = score;
console.log("checkAnswer inserted score = " + gameInfo[eq].score);
		if (eq === 10) {
			redirectMain();
		} else {
		currentEquation++;
		setNums();
		}
	} else {
		attempts--;
		idAttempts.innerHTML[0] = String(attempts);
		if (attempts <= 0) {
			score = 0;
			gameInfo[eq].score = 0;
			if (eq === 10) {
				redirectMain();
			} else {
			currentEquation++;
			setNums();
			}
		} else {
			console.log("Try again");
			idInput.value = "";
		}
	}
}

function getRandNum(max) {
	return Math.floor(Math.random() * (Number(max) - 1)) + 1;
}

function getRandSign() {
	var rand = Math.floor(Math.random() * (4 - 1)) + 1;
	var sign;
	
	switch(rand) {
		case (rand = 1):
			sign = "+";
			break;
		case (rand = 2):
			sign = "-";
			break;
		case (rand = 3):
			sign = "*";
			break;
		default:
			console.log("getRandSign() rand = " + rand);
	}
	return sign;
}
function setDifficulty() {
	var difficulty = document.getElementById("difficulty").value;

	if (difficulty === "normal") {
		return 10;
	} else if (difficulty === "nightmare") {
		return 100;
	} else if (difficulty === "hell") {
		return 1000;
	} else {
		console.log("setDifficulty() difficulty = " + difficulty);
	}
}
function setEquation(max) {
	var num1 = Number(getRandNum(max));
	var num2 = Number(getRandNum(max));
	var sign = String(getRandSign());
	var answer = Number(getAnswer(num1, num2, sign));
console.log(num1 + " " + sign + " " + num2 + " = " + answer);
	var equationString = {
		"num1": num1,
		"num2": num2,
		"sign": sign,
		"answer": answer,
		"score": 0
	};
	 return equationString;
}
function setUser(user) {
	sessionStorage.setItem("user", user);
	sessionStorage.setItem("eqNum", 2);
}

function setLocalStorage() {
	var max = setDifficulty();
	var currentTime = new Date();
	var gameId = "GameID_" + currentTime.getTime();
	var equations = setEquation(max);
	var user = idUser.value;
	var gameInfo = [
		{"user": user},
		{"gameId": gameId}
	];
	setUser(user);
	
	for (var i = 0; i < 10; i++) { 
		var eq = setEquation(max)
		gameInfo.push(eq);
	}	
	localStorage.setItem(user, JSON.stringify(gameInfo));
console.log(JSON.parse(localStorage.getItem(user)));
}
function getLocalStorage() { 
	return JSON.parse(localStorage.getItem(currentUser));
}

function checkTime() {
	var time = Number(idTimer.innerHTML);
	var score;
	
	if (time <= 30 && time >= 26) {
		score = 6;
	} else if (time <= 25 && time >= 21) {
		score = 5;
	} else if (time <= 20 && time >= 16) {
		score = 4;
	} else if (time <= 15 && time >= 11) {
		score = 3;
	} else if (time <= 10 && time >= 6) {
		score = 2;
	} else if (time <= 5 && time >= 1) {
		score = 1;
	} else {
		score = 0;
	}

	return score;
}
setInterval(function() {
	if (idTimer) {
		var time = Number(idTimer.innerHTML);
		time--;
		if (time <= 0) {
			var gameInfo = getLocalStorage();
			var eq = currentEquation;
			
			gameInfo[eq].score = 0;

			if (eq === 10) {
				redirectMain();
			} else {
			idTimer.innerHTML = 30;
			currentEquation++;
			setNums();
			}	
		} else {
		idTimer.innerHTML = String(time);
		}
	}
}, 1000);

function redirectGame() {
	window.location.href = "../html/game.html";
}
function redirectMain() {
	window.location.href = "../index.html";
}

