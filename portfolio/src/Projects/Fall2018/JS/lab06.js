var currentUser;
function init() {
	date = new Date()
	key = date.getTime();
	user = document.getElementById("user").value;
	min = Number(document.getElementById("min").value);
	max = Number(document.getElementById("max").value);
	user = user + "_" + key;

	currentUser = user;
	setUserSettings(user, min, max);

}
function redirect() {
	var selection = document.getElementById("gameType").value;

	if (selection === "add") {
		window.location.href = "./lab06html/lab06Add.html";
	} else if (selection === "sub") {
		window.location.href = "./lab06html/lab06Sub.html";
	} else if (selection === "multi") {
		window.location.href = "./lab06html/lab06Multi.html";
	} else {
		window.location.href = "./lab06html/lab06Rand.html";
	}
}
function getRand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function roll() {
	var user = JSON.parse(localStorage.getItem(currentUser));
	var min = Number(localStorage.getItem("min"));
	var max = Number(localStorage.getItem("max"));
console.log(currentUser);
console.log(user);
console.log(min);
	num1 = getRand(min, max);
	num2 = getRand(min, max);
	document.getElementById("num1").innerHTML = String(num1);
	document.getElementById("num2").innerHTML = String(num2);
console.log(user);
console.log(localStorage.getItem("user"));
}
function add(num1, num2) {
	return num1 + num2;
}
function sub(num1, num2) {
	return num1 - num2;
}
function multi(num1, num2) {
	return num1 * num2;
}
function checkAnswer() {
	var sign = document.getElementById("sign").value;
	var answer;
	
	if (sign === "+") {
		answer = add(num1, num2);
	
	}
}
function setUserSettings(getUser, getMin, getMax) {
	var user = getUser;
	var min = getMin;
	var max = getMax;
	var num1 = getRand(min, max);
	var num2 = getRand(min, max);
	var userObj = {
		"user": user,
		"min": min,
		"max": max,
		"num1": num1,
		"num2": num2
	};
	localStorage.setItem(user, JSON.stringify(userObj));


console.log(JSON.parse(localStorage.getItem("num1")));
console.log(localStorage.getItem("num2"));
}
