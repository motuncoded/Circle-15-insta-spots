const editBtn = document.getElementById("editProfileBtn");
const modal = document.getElementById("editModal");
const closeModal = document.getElementById("closeModal");
const form = document.getElementById("editForm");
const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");
    
// Show modal
editBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// Close modal

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Show image preview
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      imagePreview.src = reader.result;
      imagePreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

// Submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("nameInput").value;
  const bio = document.getElementById("bioInput").value;
  const image = document.getElementById("imagePreview").src;
  const heroName = document.querySelector('.hero__name');
  const heroBio = document.querySelector('.hero__bio');
  const heroImage = document.querySelector('.hero__img');
    

  heroName.textContent =  name;
  heroBio.textContent = bio;
  heroImage.src = image;

console.log(imageInput.value)
//   alert("Profile updated!");
  modal.classList.add("hidden");
});
