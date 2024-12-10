document.addEventListener("DOMContentLoaded", () => {
	// Fetch the JSON data
	fetch("./data.json")
		.then((response) => response.json())
		.then((data) => initialize(data))
		.catch((error) => console.error("Error fetching data:", error));

	function initialize(data) {
		const options = document.querySelectorAll(".options a");

		// Add click event listeners to each option
		options.forEach((option) => {
			option.addEventListener("click", (e) => {
				e.preventDefault();
				const timeFrame = option.textContent.toLowerCase();
				fadeOutAndUpdateCards(data, timeFrame);
			});
		});

		// Initialize the cards with default timeframe
		updateCards(data, "weekly");
	}

	function fadeOutAndUpdateCards(data, timeFrame) {
		const cards = document.querySelectorAll(".card-category");

		// Apply fade-out effect to the current cards
		cards.forEach((card) => {
			const current = card.querySelector("#current");
			const previous = card.querySelector("#previous");

			// Remove any previous animation classes to reset them
			current.classList.remove("fade-in", "fade-out");
			previous.classList.remove("fade-in", "fade-out");

			// Add fade-out class to hide elements
			current.classList.add("fade-out");
			previous.classList.add("fade-out");
		});

		// Wait for the fade-out to complete, then update and fade-in the new data
		setTimeout( _ => {
			updateCards(data, timeFrame);

			// Apply fade-in effect
			cards.forEach((card) => {
				const current = card.querySelector("#current");
				const previous = card.querySelector("#previous");

				// Remove the fade-out class and add fade-in to show new data
				current.classList.remove("fade-out");
				current.classList.add("fade-in");

				previous.classList.remove("fade-out");
				previous.classList.add("fade-in");
			});
		}, 200);
	}

	function updateCards(data, timeFrame) {
		const cards = document.querySelectorAll(".card-category");
		const labels = {
			daily: "Last day",
			weekly: "Last week",
			monthly: "Last month",
		};

		// Update each card with the corresponding data
		cards.forEach((card, index) => {
			const category = card.querySelector("#category");
			const current = card.querySelector("#current");
			const previous = card.querySelector("#previous");

			// Safeguard to ensure data is available for the card
			if (data[index]) {
				const cardData = data[index];
				category.textContent = cardData.title;
				current.textContent = `${cardData.timeframes[timeFrame].current}hrs`;
				previous.textContent = `${labels[timeFrame]} - ${cardData.timeframes[timeFrame].previous}hrs`;
			}
		});
	}
});
