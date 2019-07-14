function MakeTable() {
	var codeTable = {
		letter:["A","B","C","D","E","F","G","H","I","J","K","L","M",
			"N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
			"1","2","3","4","5","6","7","8","9","0"," ",""],
		morse:[".-","-...","-.-.","-..",".","..-.","--.","....",
			"..",".---","-.-",".-..","--","-.","---",".--.",
			"--.-",".-.","...","-","..-","...-",".--","-..-",
			"-.--","--..",".----","..---","...--","....-",
			".....","-....","--...","---..","----.","-----",","," "]
	};
	var codeJSON = JSON.stringify(codeTable);
	if (localStorage.getItem("codeJSON") === null) {
		localStorage.setItem("codeJSON", codeJSON);
	}
}
function Decode() {
	MakeTable();
	var getCode = localStorage.getItem("codeJSON");
	var code = JSON.parse(getCode);
	var input = document.getElementById("input").value;
	var output = "";
	var letter = "";

	if (input[0] === "." || input[0] === "-") {
		letter = input.split(/[\s,]+/);

		for (var x = 0; x < letter.length; x++) {
			output = output + SearchTable(letter[x]);
		}
	} else {
		letter = input.split("");

		for (var x = 0; x < letter.length; x++) {
			letter[x] = letter[x].toUpperCase();
			if (letter[x] === " ") {
				output = output + ",";
			} else {
				output = output + SearchTable(letter[x]) + " ";
			}
		}
	}
	document.getElementById("output").innerHTML = output;
}
function SearchTable(input) {
	var getCode = localStorage.getItem("codeJSON");
	var code = JSON.parse(getCode);
	var output = "";

	if (input[0] === "." || input[0] === "-") {
		for (var x = 0; x < code.morse.length; x++) {
			if (input === code.morse[x]) {
				output = code.letter[x];
			} 
		}
	} else {
		for (var y = 0; y < code.letter.length; y++) {
			if (input === code.letter[y]) {
				output = code.morse[y];
			}
		}
	}
	return output;
}
