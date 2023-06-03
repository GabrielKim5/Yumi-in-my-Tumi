//INPUT VALUE FROM SEARCH BAR USING VARIABLES

//METHOD 1

// fetch(`https://api.edamam.com/api/nutrition-data?app_id=a46b241e&app_key=18baddd7168d2adeefab92ada4de57ca&nutrition-type=cooking&ingr=${searchText}
// `)
//   .then((res) => res.json())
//   .then((data) => console.dir(data));

// METHOD 2
//   let searchText = document.getElementById('searchText').value;
//   let searchBtn = document.getElementById('searchBtn').addEventListener('click', search());

//   async function search(){
//     let results = await fetch(`https://api.edamam.com/api/nutrition-data?app_id=a46b241e&app_key=18baddd7168d2adeefab92ada4de57ca&nutrition-type=cooking&ingr=${searchText}`)
//     console.dir(results);

//   }

// // METHOD 3
// let searchText = document.getElementById('searchText').value;
// let searchBtn = document.getElementById('searchBtn').addEventListener('click',search());

// let url = `https://api.edamam.com/api/nutrition-data?app_id=a46b241e&app_key=18baddd7168d2adeefab92ada4de57ca&nutrition-type=cooking&ingr=1%20cup%20milk`

// async function fetchData(url) {
//     const response = await fetch(url);
//     const data = await response.json();

// console.dir(searchText)
//     return data;
// }

// METHOD 4 MIGUELS CODE

// 1    https://api.edamam.com/api/nutrition-data?app_id=a46b241e&app_key=18baddd7168d2adeefab92ada4de57ca&nutrition-type=cooking&ingr=1%20cup%20milk

// 2    https://api.edamam.com/api/nutrition-data?app_id=a46b241e&app_key=18baddd7168d2adeefab92ada4de57ca&nutrition-type=cooking&ingr=${searchText}

// 3    https://api.edamam.com/api/nutrition-data?app_id=a46b241e&app_key=18baddd7168d2adeefab92ada4de57ca&nutrition-type=cooking&ingr=https%3A%2F%2Fapi.edamam.com%2Fapi%2Fnutrition-details

//4    `https://api.edamam.com/api/nutrition-data?q=${input}&app_key=${app_key}&app_id=${app_id}`

// const app_id = "a46b241e";
// const app_key = "18baddd7168d2adeefab92ada4de57ca";

// let searchText = document.getElementById('searchText').value;
// let searchBtn = document.getElementById('searchBtn').addEventListener('click',search());

// async function search(){

//   let results =  fetch(`https://api.edamam.com/api/nutrition-data?app_id=a46b241e&app_key=18baddd7168d2adeefab92ada4de57ca&nutrition-type=cooking&ingr=https%3A%2F%2Fapi.edamam.com%2Fapi%2Fnutrition-details

//   `)
//   .then((res) => res.json())
//   .then((data) => console.dir(data));
// //   console.dir(searchText);

// }

// //METHOD 5 MIGUEL X GABE COLLAB
// const app_id = "a46b241e";
// const app_key = "18baddd7168d2adeefab92ada4de57ca";

// async function search(input) {
// 	let results = fetch(
// 		`https://api.edamam.com/api/nutrition-data?q=${input}&app_key=${app_key}&app_id=${app_id}`
// 	)
// 		.then((res) => res.json())
// 		.then((data) => console.dir(data));
// 	//   console.dir(searchText);
// }


// let input =

// async function getTheData(input) {
// 	try {
// 		clearResults();
// 		const appId = "a46b241e";
// 		const appKey = "18baddd7168d2adeefab92ada4de57ca";
// 		const response = await fetch(
//             `https://api.edamam.com/search?q=${input}&app_id=${appId}&app_key=${appKey}&ingr=${ingr}`
//             );
//             const data = await response.json();
//         } catch (error) {
//             console.log(error);
//         }
//     }
// ;

// DONT DELETE
// const userCardTemplate = document.querySelector("[data-user-template]")
// const userCardContainer = document.querySelector("[data-user-cards-container]")

// fetch(`https://jsonplaceholder.typicode.com/users`)
//     .then(res => res.json())
//     .then(data => {
//         data.forEach(user => {
//             const card = userCardTemplate.content.cloneNode(true).children[0];
//             const header = card.querySelector('[data-header]')
//             const body = card.querySelector('[data-body]')
//             header.textContent = user.name
//             body.textContent = user.email
//             console.dir(card)
//             userCardContainer.append(card)
//         })
//     })

const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");

const app_id = "f5c1fa7a";
const app_key = "paEfZ8VuuOPRgz4VJzTisA==EfoMS4U6ui7DpNQp";

const input = "test";

console.log(
	`https://api.api-ninjas.com/v1/nutrition?query=${input}&app_key=${app_key}`
);

fetch(`
https://api.api-ninjas.com/v1/nutrition?query=${input}&app_key=${app_key}
`)
	.then((res) => res.json())
	.then((data) => {
		data.forEach((user) => {
			const card = userCardTemplate.content.cloneNode(true).children[0];
			const header = card.querySelector("[data-header]");
			const body = card.querySelector("[data-body]");
			header.textContent = unit.foodId;
			body.textContent = label.quantity;
			console.dir(card);
			userCardContainer.append(card);
		});
	});

var query = "1lb brisket and fries";
$.ajax({
	method: "GET",
	url: "https://api.api-ninjas.com/v1/nutrition?query=" + query,
	headers: { "X-Api-Key": "paEfZ8VuuOPRgz4VJzTisA==EfoMS4U6ui7DpNQp" },
	contentType: "application/json",
	success: function (result) {
		console.dir(result);
	},
	error: function ajaxError(jqXHR) {
		console.error("Error: ", jqXHR.responseText);
	},
});
