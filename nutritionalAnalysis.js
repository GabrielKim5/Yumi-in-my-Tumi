async function yumi(query) {
	try {
		const response = await fetch(
			`https://api.api-ninjas.com/v1/nutrition?query=${query}`,
			{ headers: { "X-API-Key": "paEfZ8VuuOPRgz4VJzTisA==EfoMS4U6ui7DpNQp" } }
		);
		const data = await response.json();
		console.dir(data);
		renderAnalysis(data.Search);
	} catch (error) {
		console.dir("error", error);
	}
}

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
}
getNutritionalAnalysis();
