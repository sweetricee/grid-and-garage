/**
 * Grid & Garage - Interactive DOM Logic
 * Handles dark mode toggling, form validation, and modal animations.
 */

// --- Dark Mode Toggle ---
const themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
};

themeButton.addEventListener("click", toggleDarkMode);


// --- RSVP Form Handling & Validation ---
const rsvpForm = document.getElementById("rsvp-form");
const submitButton = document.getElementById("rsvp-button");
const rsvpParticipantsDiv = document.querySelector(".rsvp-participants");

const addParticipant = (person) => {
  const newParticipant = document.createElement("p");
  newParticipant.textContent = `🎟️ ${person.name} from ${person.state} has joined the grid!`;
  rsvpParticipantsDiv.appendChild(newParticipant);
};

const validateForm = (event) => {
  event.preventDefault(); // Prevents the page from refreshing on submit
  let containsErrors = false;

  // Select inputs directly for cleaner validation
  const nameInput = document.getElementById("name-input");
  const stateInput = document.getElementById("state-input");
  const emailInput = document.getElementById("email-input");

  const inputs = [nameInput, stateInput, emailInput];

  // Reset previous error styles
  inputs.forEach(input => input.classList.remove("error"));

  // Validate Text Inputs (Name & State)
  if (nameInput.value.length < 2) {
    containsErrors = true;
    nameInput.classList.add("error");
  }
  if (stateInput.value.length < 2) {
    containsErrors = true;
    stateInput.classList.add("error");
  }

  // Validate Email
  if (!emailInput.value.includes("@")) {
    containsErrors = true;
    emailInput.classList.add("error");
  }

  // If validation passes: Add person, trigger modal, and clear form
  if (!containsErrors) {
    const person = {
      name: nameInput.value,
      state: stateInput.value,
      email: emailInput.value
    };
    
    addParticipant(person);
    toggleModal(person);
    
    // Pro-Tip: .reset() instantly clears all inputs in a form!
    rsvpForm.reset(); 
  }
};

submitButton.addEventListener("click", validateForm);


// --- Success Modal & Animation ---
const modal = document.getElementById("success-modal");
const modalContent = document.getElementById("modal-text");
const modalImage = document.getElementById("animated-image");

let rotateFactor = 0;
let intervalId;

const animateImage = () => {
  rotateFactor = rotateFactor === 0 ? -10 : 0;
  modalImage.style.transform = `rotate(${rotateFactor}deg)`;
};

const toggleModal = (person) => {
  modal.style.display = "flex";
  modalContent.textContent = `Thank you ${person.name} from ${person.state} for joining the grid!`;

  // Start the animation ONLY when the modal opens
  intervalId = setInterval(animateImage, 500);

  // Close modal and stop animation after 5 seconds
  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 5000);
};