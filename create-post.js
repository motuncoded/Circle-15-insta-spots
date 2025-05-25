document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements for create post modal
  const newPostBtn = document.querySelector(".new_post");
  const createPostModal = document.getElementById("createPostModal");
  const closeCreatePostModal = document.getElementById("closeCreatePostModal");
  const cancelCreatePost = document.getElementById("cancelCreatePost");
  const createPostForm = document.getElementById("createPostForm");
  const postImageInput = document.getElementById("postImageInput");
  const postDescriptionInput = document.getElementById("postDescriptionInput");
  const cardsSection = document.querySelector(".cards");

  // Show create post modal
  newPostBtn.addEventListener("click", () => {
    createPostModal.classList.add("active");
  });

  // Close create post modal (multiple ways)
  function closeCreatePostModalFunc() {
    createPostModal.classList.remove("active");
    createPostForm.reset();
  }

  closeCreatePostModal.addEventListener("click", closeCreatePostModalFunc);
  cancelCreatePost.addEventListener("click", closeCreatePostModalFunc);

  // Close when clicking outside modal content
  createPostModal.addEventListener("click", (e) => {
    if (e.target === createPostModal) {
      closeCreatePostModalFunc();
    }
  });

  // Submit create post form
  createPostForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const imageFile = postImageInput.files[0];
    const description = postDescriptionInput.value;

    if (!imageFile || !description) {
      alert("Please fill all fields");
      return;
    }

    // Create a preview of the image
    const reader = new FileReader();
    reader.onload = (e) => {
      // Create new post object
      const newPost = {
        name: description,
        imgSrc: e.target.result,
        liked: false,
        id: Date.now().toString(),
      };

      // Add to cards array
      const cardsArray = JSON.parse(localStorage.getItem("cardDetails")) || [];
      cardsArray.unshift(newPost);
      localStorage.setItem("cardDetails", JSON.stringify(cardsArray));

      // Render the new card
      const cardWrapper = document.createElement("div");
      cardWrapper.classList.add("card");

      cardWrapper.innerHTML = `
          <div class="card">
              <img src="${e.target.result}" alt="${description}" />
              <div class="card__content">
                  <h4>${description}</h4>
                  <img class="like-icon" id="${description}" src="./assets/PhHeartLight.svg" alt="like-icon" />
              </div>
          </div>
        `;

      // Add like functionality
      const likeIcon = cardWrapper.querySelector(".like-icon");
      likeIcon.addEventListener("click", (event) => {
        const cardsArray =
          JSON.parse(localStorage.getItem("cardDetails")) || [];
        const updatedCards = cardsArray.map((card) => {
          if (card.name === description) {
            card.liked = !card.liked;
            event.target.src = `./assets/${
              card.liked ? "PhHeartFill" : "PhHeartLight"
            }.svg`;
          }
          return card;
        });
        localStorage.setItem("cardDetails", JSON.stringify(updatedCards));
      });

      // Add to the beginning of the cards section
      cardsSection.prepend(cardWrapper);

      // Close modal and reset form
      closeCreatePostModalFunc();
    };
    reader.readAsDataURL(imageFile);
  });

  // Optional: Image preview for the post
  postImageInput.addEventListener("change", () => {
    const file = postImageInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // You could show a preview here if you add an element for it
        // postImagePreview.src = e.target.result;
        // postImagePreview.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });
});
