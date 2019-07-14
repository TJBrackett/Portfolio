function calcAge() {
	var dobMonth = document.getElementById("bdayMonth").value - 1;
	var dobDay = document.getElementById("bdayDay").value;
	var dobYear = document.getElementById("bdayYear").value;
	var dobSecs = new Date(dobYear, dobMonth, dobDay) / 1000;
	var nowSecs = Math.round(new Date().getTime() / 1000);
	var secsInYear = 31536000;
	var secsInDay = 86400;
	var secsInHour = 3600;
	var secsInMin = 60;

	var yearsAlive = Math.floor((nowSecs - dobSecs) / secsInYear);
	var yearSecs = yearsAlive * secsInYear;
	document.getElementById("yearsAlive").innerHTML = yearsAlive; 
 
	var daysAlive = Math.floor((nowSecs - dobSecs - yearSecs) / secsInDay);
	var daySecs = daysAlive * secsInDay;
	document.getElementById("daysAlive").innerHTML = daysAlive;

	var hoursAlive = Math.floor((nowSecs - dobSecs - yearSecs - daySecs) / secsInHour);
	var hourSecs = hoursAlive * secsInHour;
	document.getElementById("hoursAlive").innerHTML = hoursAlive;

	var minsAlive = Math.floor((nowSecs - dobSecs - yearSecs - daySecs - hourSecs) / secsInMin);
	var minSecs = minsAlive * secsInMin;
	document.getElementById("minsAlive").innerHTML = minsAlive;

	var secsAlive = Math.floor(nowSecs - dobSecs - yearSecs - daySecs - hourSecs - minSecs);
	document.getElementById("secsAlive").innerHTML = secsAlive;

	downTime(dobDay, dobMonth, dobYear);
}

function downTime(day, month, year) {
	var dateSecs = new Date(year, month, day);
	var currentDec = 0;
	for (var y = 90; y <= 98; y++) {
		var currentPercent = Math.round(y * 1);
		document.getElementById(y).innerHTML = (dateSecs * currentPercent) / 1000;
	}
	var percentTracker = 100000;
	for (var x = 1; x < 7; x++) {
		var percent = 99;
		var incrementDec = Math.pow(.1, x);
		var currentPercent = (percent + currentDec);
		var downTimeOutput = (dateSecs * currentPercent) / 1000;
		var trName = (currentPercent - 99) * percentTracker;
		percentTracker = percentTracker / 10;
		document.getElementById(trName).innerHTML = Math.floor((dateSecs * currentPercent) / 1000);
		currentDec = currentDec + (incrementDec * 9);
console.log(percentTracker);
console.log(trName);
	}
}
