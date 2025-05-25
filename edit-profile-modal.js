document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const editBtn = document.getElementById("editProfileBtn");
  const modal = document.getElementById("editModal");
  const closeModal = document.getElementById("closeModal");
  const cancelEdit = document.getElementById("cancelEdit");
  const form = document.getElementById("editForm");
  const imageInput = document.getElementById("imageInput");
  const imagePreview = document.getElementById("imagePreview");
  const nameInput = document.getElementById("nameInput");
  const bioInput = document.getElementById("bioInput");

  // Current profile elements
  const currentName = document.getElementById("currentName");
  const currentBio = document.getElementById("currentBio");
  const currentProfileImg = document.getElementById("currentProfileImg");

  // Set initial form values
  nameInput.value = currentName.textContent;
  bioInput.value = currentBio.textContent;

  // Show modal
  editBtn.addEventListener("click", () => {
    modal.classList.add("active");
  });

  // Close modal (multiple ways)
  function closeModalFunc() {
    modal.classList.remove("active");
  }

  closeModal.addEventListener("click", closeModalFunc);
  cancelEdit.addEventListener("click", closeModalFunc);

  // Close when clicking outside modal content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalFunc();
    }
  });

  // Show image preview
  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });

  // Submit form
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Update profile information
    currentName.textContent = nameInput.value;
    currentBio.textContent = bioInput.value;

    // Update profile image if a new one was selected
    if (imageInput.files[0]) {
      currentProfileImg.src = URL.createObjectURL(imageInput.files[0]);
    }

    // Close modal
    closeModalFunc();

    // Optional: Save to localStorage to persist changes
    try {
      const profileData = {
        name: nameInput.value,
        bio: bioInput.value,
        image: imageInput.files[0] ? currentProfileImg.src : null,
      };
      localStorage.setItem("profileData", JSON.stringify(profileData));
    } catch (e) {
      console.log("Couldn't save to localStorage", e);
    }
  });

  // Optional: Load saved profile data from localStorage
  function loadProfileData() {
    try {
      const savedData = localStorage.getItem("profileData");
      if (savedData) {
        const profileData = JSON.parse(savedData);
        currentName.textContent = profileData.name;
        currentBio.textContent = profileData.bio;
        nameInput.value = profileData.name;
        bioInput.value = profileData.bio;
        if (profileData.image) {
          currentProfileImg.src = profileData.image;
        }
      }
    } catch (e) {
      console.log("Couldn't load from localStorage", e);
    }
  }

  loadProfileData();
});
