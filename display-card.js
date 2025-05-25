// Description: This script manages a collection of cards, allowing users to like or unlike them.

import { cardDetails } from "./data.js";

// Retrieve card details from local storage or fallback to default
const cardsArray =
  JSON.parse(localStorage.getItem("cardDetails")) || cardDetails;

const cardsContainer = document.querySelector(".cards");

// Update the like status and icon
const updateLikeStatus = (e, name) => {
  cardsArray.forEach((card) => {
    if (card.name === name) {
      card.liked = !card.liked; // Toggle the liked status
      e.target.src = `./assets/${
        card.liked ? "PhHeartFill" : "PhHeartLight"
      }.svg`; // Update icon
    }
  });

  // Store updated card details in local storage
  localStorage.setItem("cardDetails", JSON.stringify(cardsArray));
};

// Render a single card
const renderCard = (card) => {
  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("card");

  cardWrapper.innerHTML = `
    <div class="card">
        <img src="${card.imgSrc}" alt="${card.name}" />
        <div class="card__content">
            <h4>${card.name}</h4>
            <img class="like-icon" id="${card.name}" src="./assets/${card.liked ? "PhHeartFill" : "PhHeartLight"}.svg" alt="like-icon" />
        </div>
    </div>
  `;

  cardWrapper.querySelector(".like-icon").addEventListener("click", (e) => {
    updateLikeStatus(e, card.name);
  });

  cardsContainer.appendChild(cardWrapper);
};

// Render all cards
const renderCards = () => {
  cardsContainer.innerHTML = ""; // Clear existing cards
  cardsArray.forEach(renderCard);
};

// Initial render2
renderCards();
