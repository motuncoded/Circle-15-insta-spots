import { cardDetails } from "./data.js";

// Retrieve card details from local storage or fallback to default
const cardsArray =
  JSON.parse(localStorage.getItem("cardDetails")) || cardDetails;

// post container  
const cardsContainer = document.querySelector(".cards");
// new post button
const newPostButton = document.querySelector(".new_post");


// Add event listener for new post button

// Description:
// Allow card images to be previewed in a modal. When an image is clicked, it should open in a modal with the title displayed below.

// Tasks:

// Create modal structure for image preview.

// Display full-size image with title.

// Ensure fixed modal size for desktop and mobile.

const createModal = () => {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal__content">
      <span class="modal__close" aria-label="Close Modal">&times;</span>
      <img class="modal__image" src="" alt="Preview" />
      <h4 class="modal__title"></h4>
    </div>
  `;
  document.body.appendChild(modal);

  // Close modal on click
  modal.querySelector(".modal__close").addEventListener("click", () => {
    modal.remove();
  });
};
newPostButton.addEventListener("click", () => {
  // Create modal if it doesn't exist
  if (!document.querySelector(".modal")) {
    createModal();
  }
});

// what do i add to the new_post button in the html file?


// Update the like status and icon
  function updateLikeStatus(e, name) {
    cardsArray.forEach((card) => {
      if (card.name === name) {
        card.liked = !card.liked; // Toggle the liked status
        e.target.src = `./assets/${card.liked ? "PhHeartFill" : "PhHeartLight"}.svg`; // Update icon
      }
    });

    // Store updated card details in local storage
    localStorage.setItem("cardDetails", JSON.stringify(cardsArray));
  }

// Render a single card
const renderCard = (card) => {
  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("card");

  const heartIcon = card.liked ? "PhHeartFill" : "PhHeartLight"; // Determine heart icon

  cardWrapper.innerHTML = `
    <div class="card">
        <img src="${card.imgSrc}" alt="${card.name}" />
        <div class="card__content">
            <h4>${card.name}</h4>
            <img class="like-icon" id="${card.name}" src="./assets/${heartIcon}.svg" alt="like-icon" />
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




// new post functionality


