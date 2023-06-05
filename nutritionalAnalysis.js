// THIS FUNCTION RETRIEVES THE DATA FROM THE API
async function yumi(query) {
	try {
		const response = await fetch(
			`https://api.api-ninjas.com/v1/nutrition?query=${query}`,
			{ headers: { "X-API-Key": "paEfZ8VuuOPRgz4VJzTisA==EfoMS4U6ui7DpNQp" } }
		);
		const data = await response.json();
		console.dir(data[0]);
		
		let testVariable = data[0].cholesterol_mg;
			console.dir(testVariable);
		for (let key in testVariable) {
			// console.dir(key, key[testVariable])
			console.dir(testVariable[key]);
			
		}



	} catch (error) {
		console.dir("error", error);
		
	}
}
// OUTPUT EXAMPLE
// 1 cup milk
// 0:
// 	calories:
// 	carbs:
//	etc

//THIS FUNCTION ACCEPTS SEARCH BAR INPUT, PRINTS THE NUTRITIONAL ANALYSIS TO THE CONSOLE.
function getNutritionalAnalysis() {
	let searchBox = document.querySelector(".search-bar");
	const searchBtn = document.querySelector("#searchBtn");
	searchBtn.addEventListener("click", (e) => {
		e.preventDefault();
		let query = searchBox.value;
		// console.log(input);
		yumi(query);
		if (searchBtn) {
			// searchBox.value = '';
		}
	});
	// console.dir(array.length);
}
getNutritionalAnalysis();

// let query = myElement.innerHTML;

// const resultDiv = document.querySelector(".resultdiv");
// const foodCardsDiv = document.createElement("div");
// foodCardsDiv.classList.add(`card-container`);

// foodCardsDiv.innerHTML = `
//         <div class="card bg-success-subtle shadow" style="width: 18rem;" id="${1}">`;


// METHOD 2
// He creates a variables named foodCardsDiv, which creates an empty DIV
// Miguel inject the innerHTML to the foodCardsDiv and styles is with BS
//in this, i might change results to the array for the api
// let x = document.getElementById('results').innerHTML;
// function myFunction(){
// 	document.getElementById('demo2 or the div where the info goes').innerHTML = x;
// 	console.dir('myFunctionTest')
// }
// myFunction();



