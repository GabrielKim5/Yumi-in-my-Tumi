
// API CALL:
//https://api.edamam.com/api/recipes/v2

//API KEY:
// 0fbedc45644d7fab8f90e3cec73f5625

// API ID:
// 192c1847

async function getTheData(input) {
    try {
      clearResults();
      const appId = "a4b3829f";
      const appKey = "330a149b22308c8631a0185a33d77792";
      const response = await fetch(
        `https://api.edamam.com/search?q=${input}&app_id=${appId}&app_key=${appKey}`
      );
      const data = await response.json();
      const arrayOfData = data.hits;
      arrayOfData.forEach((foodInfo, index) => {
        let recipeCalories = Math.round(
          Math.round(foodInfo.recipe.calories) / foodInfo.recipe.yield
        );
        // console.log(foodInfo.recipe);
        let recipeUri = foodInfo.recipe.uri;
        let recipeUrl = foodInfo.recipe.url;
        // console.log(recipeUri.split("#").slice(1));
        let recipeId = recipeUri.split("#").splice(1);
        // console.log(recipeId);
        let recipeLabel = foodInfo.recipe.label;
        let recipeImage = foodInfo.recipe.image;
        const foodDigest = foodInfo.recipe.digest;
        const ingredients = foodInfo.recipe.ingredientLines;
          const resultDiv = document.querySelector(".resultdiv");
          const foodCardsDiv = document.createElement("div");
          foodCardsDiv.classList.add(`card-container`);
  let nutrientsLabelsHTML = "";
          for(let k =0; k < foodDigest.length; k++){
            // console.log(foodDigest[k].label);
            let nutrientsLabel = foodDigest[k].label;
            let nutrientsQuantity = Math.round(foodDigest[k].total) + foodDigest[k].unit;
            nutrientsLabelsHTML += `<p class="fw-medium">${nutrientsLabel}:- ${nutrientsQuantity}</p>`;
            // console.log(nutrientsLabel);
          }
          foodCardsDiv.innerHTML = `
        <div class="card bg-success-subtle my-2 shadow" style="width: 18rem;" id="${recipeId}">
      <img src="${recipeImage}" class="card-img-top food-image" alt="food name">
      <div class="card-body d-grid">
        <h2 class="card-title text-center">${recipeLabel}</h2>
        <h5 class="card-text text-center">${recipeCalories} kcal /plate</h5>
      </div>
      <div class="gap-2 d-flex justify-content-center card-buttons">
        <button type="button" class="btn btn-danger btn-lg w-75">Favorites &hearts;</button>
        </div>
      <div class="d-flex justify-content-evenly gap-4 my-4">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-${index}">
    Total Nutrients
  </button>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ingredients-modal-${index}">
                Ingredients
              </button>
  </div>
  <div class="modal fade" id="modal-${index}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modal-${index}-label" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modal-${index}-label">Nutrients</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-center">
        <h4>${recipeLabel} Nutrients</h4>
        <hr>
          ${nutrientsLabelsHTML}
        <hr>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
    </div>
    </div>
    <div class="modal fade " id="ingredients-modal-${index}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="ingredients-modal-${index}-label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="ingredients-modal-${index}-label">${recipeLabel} Ingredients</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body ">
          <h3>${recipeLabel} Ingredients</h3>
          <ul>
            ${ingredients.map((ingredient) => `<li class="fs-3">${ingredient}</li>`).join("")}
          </ul>
          <h2>Instructions: </h2>
          <a href="${recipeUrl}">Click to watch the Insructions</a>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`
          resultDiv.append(foodCardsDiv);
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
      let input = searchBox.value;
      // console.log(input);
      getTheData(input);
      if (searchBtn) {
        // searchBox.value = '';
      }
    });
  }
  function clearResults() {
    const resultDiv = document.querySelector(".resultdiv");
    resultDiv.innerHTML = "";
  }
  searchRecipe();

//Variables and buttons to start the functions
const body = document.querySelector("body");
console.dir(body);
const root = document.getElementById("root");
const start = document.getElementById("start");
const [favoriteBtn, ingredientAnalyzerBtn] =
  document.querySelectorAll(".start button");

//1
// FAVORITE BUTTON EVENTLISTENER
favoriteBtn.addEventListener("click", (e) => {
  start.className = "hide";
  root.appendChild(favorites());
});
//2
// INGREDIENT ANALYZER EVENTLISTENER
ingredientAnalyzerBtn.addEventListener("click", (e) => {
  start.className = "hide";
  root.appendChild(ingredients());
});
//3
// FAVORITES BUTTON PAGE FUNCTION
function favorites() {
  const favDiv = document.createElement("div");
  favDiv.id = "favorite-section";
  favDiv.innerHTML = `
    <h1>FAVORITES SECTION GOES HERE</h1>`;

  //BACK BUTTON
  // {{{{
  const backButton = document.createElement("button");
  backButton.textContent = "Go Back";

  backButton.addEventListener("click", (e) => {
    document.getElementById("favorite-section").remove();
    start.className = "start";
  });
  // }}}}

  favDiv.appendChild(backButton);
  return favDiv;
}

// ------------------------------

//4
//INGREDIENT ANALYZER PAGE BUTTON FUNCTION
function ingredients() {
  body.className = "ingredients";
  body.classList.add("ingredients");

  const ingredientsDiv = document.createElement("div");
  ingredientsDiv.id = "ingredients";
  ingredientsDiv.innerHTML = `
    <h1>THIS IS WHERE PEOPLE GET NUTRITION FACTS OF FOOD</h1>`;

  //BACK BUTTON
  // {{{{
  const backButton = document.createElement("button");
  backButton.textContent = "Go Back";
  backButton.addEventListener("click", (e) => {
    document.getElementById("ingredients").remove();
    start.className = "start";
    body.className = "";
  });
  // }}}}

  ingredientsDiv.appendChild(backButton);
  return ingredientsDiv;
}


//Recipe API and about us are works in progress


//ADDITIONAL NOTES:
//Small color change animation when button is pressed?

