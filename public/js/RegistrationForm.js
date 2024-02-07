const numberOfMember = document.querySelector("#numberOfMember");
const userRegistrationForm = document.querySelector(".userRegistrationForm");
const teamMemberSpace = document.querySelector(".teamMemberSpace");
const saveNext = document.querySelector(".saveNext");
const payment = document.querySelector(".payment");
const details = document.querySelector(".details");
const upiNumber = document.querySelector("#upi-Number");
const imageUpload = document.querySelector("#imageUpload");
const errorSpan = document.getElementById("errorSpan");

var selectedValue = numberOfMember.value;
console.log(selectedValue);

saveNext.addEventListener("click", () => {
  details.classList.remove("d-none");
  payment.classList.add("d-none");
});

numberOfMember.addEventListener("focus", () => {
  console.log("focus:", numberOfMember.value);
});
numberOfMember.addEventListener("blur", () => {
  console.log("blur:", numberOfMember.value);
  const count = numberOfMember.value;
  for (var i = 0; i < count - 1; i++) {
    const htmlString = `<div class="mb-3">
    <label for="member-Name-${i + 1}" class="form-label"> Member ${
      i + 1
    } Name</label>
    <input type="text" class="form-control" id="member-Name-${
      i + 1
    }" aria-describedby="member-Name-${i + 1}" name="memberName${
      i + 1
    }" required>
  </div>
  <div class="mb-3">
    <label for="member-email-${i + 1}" class="form-label"> Member ${
      i + 1
    } email</label>
    <input type="text" class="form-control" id="member-email-${
      i + 1
    }" aria-describedby="member-email-${i + 1}" name="memberEmail${
      i + 1
    }" required>
  </div>
  <div class="mb-3">
    <label for="member-contact-${i + 1}" class="form-label"> Member ${
      i + 1
    } contact number</label>
    <input type="text" class="form-control" id="member-contact-${
      i + 1
    }" aria-describedby="member-contact-${i + 1}" name="memberContact${
      i + 1
    }" required>
  </div>
  <div class="mb-3">
    <label for="member-institute-id-${i + 1}" class="form-label"> Member ${
      i + 1
    } Student-Id/ Employ-Id</label>
    <input type="text" class="form-control" id="member-institute-id-${
      i + 1
    }" aria-describedby="member-institute-id-${i + 1}" name="memberInstituteId${
      i + 1
    }" required>
  </div>`;

    teamMemberSpace.insertAdjacentHTML("beforeend", htmlString);
  }
});

// Function to validate input containing only numbers
function validateNumbers(input) {
  // Regex pattern for numbers validation
  const numbersRegex = /^[0-9]+$/;

  // Test the input against the regex pattern
  return numbersRegex.test(input);
}

function validateFile() {
  // Get the selected file
  const file = imageUpload.files[0];

  // Check if a file is selected
  if (!file) {
    return false;
  }
  return true;
}

numberOfMember.addEventListener("blur", (event) => {
  if (!upiNumber.checkValidity()) {
    // If the input is not valid, prevent form submission
    event.preventDefault();
    // Show an error message
    errorSpan.textContent = "Please enter a valid 12-digit number.";
  } else {
    // Clear any previous error message
    errorSpan.textContent = "";
    if (
      numberOfMember.value != "Open this select menu" &&
      validateNumbers(upiNumber.value) &&
      validateFile()
    ) {
      saveNext.classList.remove("disabled");
    }
  }
});
console.log("upi number:", upiNumber);
upiNumber.addEventListener("blur", (event) => {
  if (!upiNumber.checkValidity()) {
    // If the input is not valid, prevent form submission
    event.preventDefault();
    // Show an error message
    errorSpan.textContent = "Please enter a valid 12-digit number.";
  } else {
    // Clear any previous error message
    errorSpan.textContent = "";
    if (
      numberOfMember.value != "Open this select menu" &&
      validateNumbers(upiNumber.value) &&
      validateFile()
    ) {
      saveNext.classList.remove("disabled");
    }
  }
});

console.log(imageUpload);
imageUpload.addEventListener("blur", (event) => {
  if (!upiNumber.checkValidity()) {
    // If the input is not valid, prevent form submission
    event.preventDefault();
    // Show an error message
    errorSpan.textContent = "Please enter a valid 12-digit number.";
  } else {
    // Clear any previous error message
    errorSpan.textContent = "";
    if (
      numberOfMember.value != "Open this select menu" &&
      validateNumbers(upiNumber.value) &&
      validateFile()
    ) {
      saveNext.classList.remove("disabled");
    }
  }
});

numberOfMember.addEventListener("focus", (event) => {
  if (!upiNumber.checkValidity()) {
    // If the input is not valid, prevent form submission
    event.preventDefault();
    // Show an error message
    errorSpan.textContent = "Please enter a valid 12-digit number.";
  } else {
    // Clear any previous error message
    errorSpan.textContent = "";
    if (
      numberOfMember.value != "Open this select menu" &&
      validateNumbers(upiNumber.value) &&
      validateFile()
    ) {
      saveNext.classList.remove("disabled");
    }
  }
});
console.log("upi number:", upiNumber);
upiNumber.addEventListener("focus", (event) => {
  if (!upiNumber.checkValidity()) {
    // If the input is not valid, prevent form submission
    event.preventDefault();
    // Show an error message
    errorSpan.textContent = "Please enter a valid 12-digit number.";
  } else {
    // Clear any previous error message
    errorSpan.textContent = "";
    if (
      numberOfMember.value != "Open this select menu" &&
      validateNumbers(upiNumber.value) &&
      validateFile()
    ) {
      saveNext.classList.remove("disabled");
    }
  }
});

console.log(imageUpload);
imageUpload.addEventListener("focus", (event) => {
  if (!upiNumber.checkValidity()) {
    // If the input is not valid, prevent form submission
    event.preventDefault();
    // Show an error message
    errorSpan.textContent = "Please enter a valid 12-digit number.";
  } else {
    // Clear any previous error message
    errorSpan.textContent = "";
    if (
      numberOfMember.value != "Open this select menu" &&
      validateNumbers(upiNumber.value) &&
      validateFile()
    ) {
      saveNext.classList.remove("disabled");
    }
  }
});
