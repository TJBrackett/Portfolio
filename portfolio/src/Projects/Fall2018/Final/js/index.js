var currentUser;
var currentEquation;

//Set Functions

function newGame() {
	currentEquation = sessionStorage.getItem("eqNum");
	currentUser = sessionStorage.getItem("user");

	setFocus();

	document.getElementById("eqNum").innerHTML = 1;
	document.getElementById("score").innerHTML = 0;
	document.getElementById("user").innerHTML = currentUser;

	setNums();
}

function setNums() {
	var eq = currentEquation;
	var gameInfo = getLocalStorage();

	document.getElementById("num1").innerHTML = String(gameInfo[eq].num1);
	document.getElementById("num2").innerHTML = String(gameInfo[eq].num2);
	document.getElementById("sign").innerHTML = String(gameInfo[eq].sign);
	document.getElementById("attempts").innerHTML = 4;
	document.getElementById("timer").innerHTML = 30;
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

function setFocus() {
	document.getElementById("input").focus();
}

function setLocalStorage() {
	var diff = document.getElementById("difficulty").value;
	var max = setDifficulty();
	var currentTime = new Date();
	var gameId = diff + "_" + currentTime.getTime();
	var equations = setEquation(max);
	var user = document.getElementById("input").value;
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
}

//Get Functions

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

function getLocalStorage() { 
	return JSON.parse(localStorage.getItem(currentUser));
}

//Check Functions

function checkAnswer() {
	setFocus();

	var eq = currentEquation;
	var gameInfo = getLocalStorage();
	var eqNum = Number(document.getElementById("eqNum").innerHTML);
	var answer = Number(gameInfo[eq].answer);
	var attempts = Number(document.getElementById("attempts").innerHTML);
	var score = 0;
	var input = Number(document.getElementById("input").value);
	var time = Number(checkTime());
	var totalScore = Number(document.getElementById("score").innerHTML);

	if (answer === input) {
		console.log("Good job!");
		eqNum++
		score = time + attempts;
		totalScore = totalScore + score
		gameInfo[eq].score = score;

		document.getElementById("eqNum").innerHTML = eqNum;
		document.getElementById("input").value = "";
		document.getElementById("score").innerHTML = totalScore;

		if (eq > 10) {
			document.getElementById("eqNum").innerHTML = "Uploading...";
			sendToFirebase();
		} else {
			currentEquation++;
			setNums();
		}
	} else {
		attempts--;
		document.getElementById("attempts").innerHTML = String(attempts);
		
		if (attempts <= 0) {
			document.getElementById("eqNum").innerHTML = gameNum;
			document.getElementById("input").value = "";
			score = 0;
			gameInfo[eq].score = 0;
			if (eq > 10) {
				document.getElementById("eqNum").innerHTML = "Uploading...";
				sendToFirebase();
			} else {
				currentEquation++;
				setNums();
			}
		} else {
			console.log("Try again");
			document.getElementById("input").value = "";
		}
	}
}

function checkTime() {
	var time = Number(document.getElementById("timer").innerHTML);
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

//Database Functions

function sendToFirebase() {
	document.getElementById("submit").disabled = true;
	var totalScore = document.getElementById("score").innerHTML;
	var gameInfo = getLocalStorage();
	var user = String(gameInfo[0].user);
	var gameId = String(gameInfo[1].gameId);
	var infoObj = {
		userName: user,
		gameId: gameId
	};
		for (var i = 2; i < 12; i++){
			infoObj["equation_" + (i - 2)] = {
				num1: gameInfo[i].num1,
				num2: gameInfo[i].num2,
				sign: gameInfo[i].sign,
				answer: gameInfo[i].answer,
				score: Number(gameInfo[i].score)
			};
		}
	infoObj["totalScore"] = totalScore;
	if (navigator.onLine) {
	db.collection("users").doc(user).set(infoObj).then(function() {
		console.log("Success!");
		localStorage.removeItem(currentUser);
		redirectMain();
	}, {merge: true});
	} else {
		sendToFirebase();
	}
}

//Misc

setInterval(function() {
	if (document.getElementById("timer")) {
		var time = Number(document.getElementById("timer").innerHTML);

		time--;

		if (time <= 0) {
			var gameInfo = getLocalStorage();
			var eq = currentEquation;
			
			gameInfo[eq].score = 0;

			if (eq > 10) {
				document.getElementById("eqNum").innerHTML = "Uploading...";
				sendToFirebase();
			} else {
				document.getElementById("timer").innerHTML = 30;
				currentEquation++;
				setNums();
			}	
		} else {
			document.getElementById("timer").innerHTML = String(time);
		}
	}
}, 1000);

function redirectGame() {
	window.location.href = "../html/game.html";
}

function redirectMain() {
	window.location.href = "../index.html";
}

var input = document.getElementById("input");
input.addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.keyCode === 13) {
		document.getElementById("submit").click();
	}
});
