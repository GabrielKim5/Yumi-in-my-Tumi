let allergy = "";

async function getTheData(input) {
	try {
		const appId = "192c1847";
		const appKey = "0fbedc45644d7fab8f90e3cec73f5625";

		const response = await fetch(
			`https://api.edamam.com/search?q=${input}&app_id=${appId}&app_key=${appKey}&from=0&to=25&excluded=${allergy}&mealType=dinner&mealType=breakfastmealType=lunch`
		);
		clearResults();
		const data = await response.json();
		const arrayOfData = data.hits;

		arrayOfData.forEach((foodInfo, index) => {
			let recipeCalories = Math.round(
				Math.round(foodInfo.recipe.calories) / foodInfo.recipe.yield
			);

			// console.log(foodInfo.recipe);
			let recipeUri = foodInfo.recipe.uri;
			// let recipeUrl = foodInfo.recipe.url;
			// // console.log(recipeUri.split("#").slice(1));
			// let recipeId = recipeUri.split("#").splice(1);
			// // console.log(recipeId);
			let recipeLabel = foodInfo.recipe.label;
			let recipeImage = foodInfo.recipe.image;
			const foodDigest = foodInfo.recipe.digest;
			const ingredients = foodInfo.recipe.ingredientLines;

			const resultDiv = document.querySelector(".resultdiv");
			const foodCardsDiv = document.createElement("div");
			foodCardsDiv.classList.add(`card-container`);
			const fav = document.querySelector(".fav");
			let nutrientsLabelsHTML = "";
			for (let k = 0; k < foodDigest.length; k++) {
				// console.log(foodDigest[k].label);
				let nutrientsLabel = foodDigest[k].label;
				let nutrientsQuantity =
					Math.round(foodDigest[k].total / foodInfo.recipe.yield) +
					foodDigest[k].unit;
				nutrientsLabelsHTML += `<div class="container-fluid text-center">
        <hr>
        <div class="row">
          <div class="col fs-4">
            ${nutrientsLabel}
          </div>
          <div class="col fs-4">
            ${nutrientsQuantity}
          </div>
        </div>
      </div>`;
				// console.log(nutrientsLabel);
			}
			foodCardsDiv.innerHTML = `
        <div class="card bg-success-subtle shadow" style="width: 18rem;" id="${recipeUri}">
      <img src="${recipeImage}" class="card-img-top food-image" alt="food name">
      <div class="card-body d-grid">
        <h2 class="card-title text-center fw-bold">${recipeLabel}</h2>
        <h5 class="card-text text-center">--${recipeCalories} kcal /plate--</h5>
      </div>
      <div class="gap-2 d-flex justify-content-center card-buttons">
        <button type="button" class="btn btn-danger shadow btn-lg w-75 favbutton-${index}" >Favorites &hearts;</button>
        </div>
      <div class="d-flex justify-content-evenly gap-4 my-4">
        <button type="button" class="btn bg-success text-light shadow" data-bs-toggle="modal" data-bs-target="#modal-${index}">
    Total Nutrients
  </button>
  <button type="button" class="btn btn bg-success text-light shadow" data-bs-toggle="modal" data-bs-target="#ingredients-modal-${index}">
                Ingredients
              </button>
  </div>
  <div class="modal fade" id="modal-${index}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modal-${index}-label" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-warning-subtle">
        <h1 class="modal-title fs-3 fw-bold" id="modal-${index}-label">${recipeLabel} Nutrients</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-center">
          ${nutrientsLabelsHTML}
        <hr>
      </div>
      <div class="modal-footer bg-warning-subtle">
        <button type="button" class="btn bg-success text-light" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
    </div>
    </div>
    <div class="modal fade " id="ingredients-modal-${index}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="ingredients-modal-${index}-label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-warning-subtle">
          <h1 class="modal-title fs-3 fw-bold" id="ingredients-modal-${index}-label">${recipeLabel} Ingredients</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body ">
          <ul>
            ${ingredients
							.map((ingredient) => `<li class="fs-4">${ingredient}</li>`)
							.join("")}
          </ul>
          <h2>Instructions: </h2>
          <a href="${recipeUri}">Click to watch the Insructions</a>
        </div>
        <div class="modal-footer bg-warning-subtle">
          <button type="button" class="btn bg-success text-light" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`;

			resultDiv.append(foodCardsDiv);

			let favoriteBtn = document.querySelector(`.favbutton-${index}`);

			favoriteBtn.addEventListener("click", (e) => {
				e.preventDefault();

				const favorite = getFavorite();

				if (favoriteBtn.classList.contains("btn-danger")) {
					favoriteBtn.classList.remove("btn-danger");
					favoriteBtn.classList.add("btn-primary");
					favoriteBtn.textContent = "ADDED";
					// addToFavorite(recipeUri);

					const newCard = {
						recipeImage,
						recipeLabel,
						recipeCalories,
						ingredients,
						nutrientsLabelsHTML,
					};
					favorite.push(newCard);
					localStorage.setItem("favorite", JSON.stringify(favorite));
					displayFavorites();
				} else {
					favoriteBtn.classList.remove("btn-primary");
					favoriteBtn.classList.add("btn-danger");
					favoriteBtn.innerHTML = `Favorites <span>&hearts;</span>`;
					removeFromFavorite(recipeUri);
					localStorage.setItem(
						"favorite",
						JSON.stringify(
							favorite.filter((item) => item.recipeUri !== recipeUri)
						)
					);
					displayFavorites();
				}
			});
		});
	} catch (error) {
		console.log(error);
	}
}

function searchRecipe() {
	let searchBox = document.querySelector(".search-input");
	const searchBtn = document.querySelector("#search-button");
	searchBtn.addEventListener("click", (e) => {
		e.preventDefault();
		let input = searchBox.value.trim().toLowerCase();
		if (searchBtn) {
			searchBox.value = "";
		}
		getTheData(input);
	});
}

function clearResults() {
	const resultDiv = document.querySelector(".resultdiv");
	resultDiv.innerHTML = "";
}

const homeContainer = document.querySelector(".body-container");
let filterInput = document.querySelector(".filter-input");
let filterBtn = document.querySelector(".filter-btn");

filterBtn.addEventListener("click", (e) => {
	e.preventDefault();

	allergy = filterInput.value.replaceAll(",", "&excluded=");
	// console.log(allergy);
	let searchBox = document.querySelector(".search-input");
	let input = searchBox.value.trim().toLowerCase();
	getTheData(input);
	return allergy;
});

// Making an Empty Array List in Local Storage.
function getFavorite() {
	const favorite = JSON.parse(localStorage.getItem("favorite"));
	return favorite === null ? [] : favorite;
	// the question mark condition ? expression TRUE : expression FALSE ( it's like an IF Statement)
}

function addToFavorite(id) {
	const favorite = getFavorite();
	// getting the recipe item from the array list in local storage.
	// setItem(keyName, keyValue)
	localStorage.setItem("favorite", JSON.stringify([...favorite, id]));
}

// addTogetList("Hello");

function removeFromFavorite(id) {
	const favorite = getFavorite();
	localStorage.setItem(
		"favorite",
		JSON.stringify(favorite.filter((value) => value !== id))
	);
}

function clearResults() {
	const resultDiv = document.querySelector(".resultdiv");
	resultDiv.innerHTML = "";
	localStorage.removeItem("favorite");

	displayFavorites();
}

function displayFavorites() {
	const favorite = getFavorite();
	const fav = document.querySelector(".fav");
	const tempStrip = favorite
		.map(
			(item, index) => `
    <div class="card bg-success-subtle shadow" style="width: 18rem;" id="${item.recipeUri}">
      <img src="${item.recipeImage}" class="card-img-top food-image" alt="food name">
      <div class="card-body d-grid">
        <h2 class="card-title text-center fw-bold">${item.recipeLabel}</h2>
        <h5 class="card-text text-center">--${item.recipeCalories} kcal /plate--</h5>
      </div>
      <div class="gap-2 d-flex justify-content-center card-buttons">
        <button type="button" class="btn btn-primary shadow btn-lg w-75 favbutton-${index}" >ADDED</button>
      </div>
      <!-- Rest of the card content and modals -->
    </div>
  `
		)
		.join("");

	fav.innerHTML = tempStrip;
}

searchRecipe();
