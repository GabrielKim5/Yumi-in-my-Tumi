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