import React from 'react'
import "./CSS/index.css"

function School() {
	return(
		<React.Fragment>
	<div className="School">
			<link href="https://fonts.googleapis.com/css?family=Advent+Pro|Cinzel|Cinzel+Decorative|Julius+Sans+One|Poiret+One|Reem+Kufi|Reenie+Beanie|Ubuntu" rel="stylesheet"></link>
    		<title>TJ Brackett 252</title>
			<h1>TJ Brackett</h1>
			<table id="table">
			<caption>Mouseover picture for preview.</caption>
			<tr>
				<th>Assignment Preview</th>
				<th>Assignment Description</th>
			</tr>
			<tr>
				<td>
				<a href = "./Pics/Lab00_Pg1.jpg"><img src = "./Pics/Lab00_Pg1.jpg" alt = "Lab 00 Page 1" /></a>
					<div class = "box"><iframe src = "./Pics/Lab00_Pg1.jpg" width = "1500px" height = "1000px">
						</iframe></div>
	
				<a href = "./Pics/Lab00_Pg2.jpg"><img src = "./Pics/Lab00_Pg2.jpg" alt = "Lab 00 Page 2" /></a>
					<div class = "box"><iframe src = "./Pics/Lab00_Pg2.jpg" width = "1500px" height = "1000px">
						</iframe></div>
			</td>

			<td>Lab 00 - Notes for Javascript The Good(Bad) Parts by Doug Crockford<a href = "./Pics/Lab00_Pg1.jpg">Page 1</a><a href = "./Pics/Lab00_Pg2.jpg">Page 2</a></td>
			</tr>
			<tr>
			<td>
				<a href = "./Pics/Lab02.jpg"><img src = "./Pics/Lab02.jpg" alt = "Lab 02" /></a>
					<div class = "box"><iframe src = "./Pics/Lab02.jpg" width = "1500px" height = "1000px">
						</iframe></div>
			</td>
			<td><a href = "./Pics/Lab02.jpg">Lab 02</a> - Pluralsight JS Skill IQ</td>
		</tr>
		<tr>
			<td>
				<a href = "./HTML/lab03.html"><img src = "./Pics/Lab03.jpg" alt = "Lab 03" /></a>
					<div class = "box"><iframe src = "./HTML/lab03.html" width = "1000px" height = "1000px">
						</iframe></div>
			</td>
			<td><a href = "lab03.html">Lab 03</a> - Head First HTML5 Ch 9 Sticky Notes</td>
		</tr>
		<tr>
			<td>
				<a href = "./HTML/lab04.html"><img src = "./Pics/Lab04.jpg" alt = "Lab 04" /></a>
					<div class = "box"><iframe src = "./HTML/lab04.html" width = "1000px" height = "1000px">
						</iframe></div>
			</td>
			<td><a href = "./HTML/lab04.html">Lab 04</a> - A webpage that adds two numbers entered by the user.</td>
		</tr>
		<tr>
			<td>
				<a href = "./HTML/lab05.html"><img src = "./Pics/Lab05.jpg" alt = "Lab 05" /></a>
					<div class = "box"><iframe src = "./HTML/lab05.html" width = "1000px" height = "1000px">
						</iframe></div>
			</td>
			<td><a href = "./HTML/lab05.html">Lab 05</a> - Calculate years, days, hours, mins, secs alive and determine downtime for each year.</td>
       		</tr>
		<tr>
			<td>
				<a href = "./HTML/lab06.html"><img src = "./Pics/Lab06.jpg" alt = "Lab 06" /></a>
					<div class = "box"><iframe src = "./HTML/lab06.html" width = "1000px" height = "1000px">
						</iframe></div>
			</td>
			<td><a href = "./HTML/lab06.html">Lab 06</a> - Math game. Either adds, subtracts, multuplies, or randomly does ones of the three
				to a random number within the user's desired range.</td>
		</tr>
		<tr>
			<td>
				<a href = "./HTML/lab07.html"><img src = "./Pics/Lab07.jpg" alt = "Lab 07" /></a>
					<div class = "box"><iframe src = "./HTML/lab07.html" width = "1000px" height = "1000px">
						</iframe></div>

			</td>
			<td><a href = "./HTML/lab07.html">Lab 07</a> - Convert words to morse code and vice versa.</td>
		</tr>
		<tr>
			<td>
				<a href = "./HTML/lab08.html"><img src = "./Pics/Lab08.jpg" alt = "Lab 08" /></a>
					<div class = "box"><iframe src = "./HTML/lab08.html" width = "1000px" height = "1000px">
						</iframe></div>
			</td>
			<td><a href = "./HTML/lab08.html">Lab 08</a> - Plot lat and long on google maps using IP addresses.</td>
		</tr>
		<tr>
			<td>
				<a href = "https://lab-10-1ef3d.firebaseapp.com/"><img src = "./Pics/Lab03.jpg" alt = "Lab 10" /></a>
					<div class = "box"><iframe src = "https://lab-10-1ef3d.firebaseapp.com/" width = "1000px" height = "1000px">
						</iframe></div>
			</td>
			<td><a href = "https://lab-10-1ef3d.firebaseapp.com/">Lab 10</a> - Convert sticky note app (Lab 03) to use Firebase.</td>
		</tr>
		<tr>
			<td>
				<a href = "https://final-proj-252.firebaseapp.com/"><img src = "./Pics/final.jpg" alt = "Final" /></a>
					<div class = "box"><iframe src = "https://final-proj-252.firebaseapp.com/" width = "1000px" height = "1000px">
						</iframe></div>
			</td>
			<td><a href = "https://final-proj-252.firebaseapp.com/">Final Project</a> - Math game 2.0</td>
		</tr>
		</table>
</div>
</React.Fragment>
)}

function Render() {
	return (
		<School />
	)
}

export default Render
