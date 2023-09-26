const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Define validation patterns
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// Function to validate email
function validateEmail() {
    if (emailPattern.test(emailInput.value)) {
        emailError.textContent = '';
    } else {
        emailError.textContent = 'Invalid email format';
    }
}

// Function to validate password
function validatePassword() {
    if (passwordPattern.test(passwordInput.value)) {
        passwordError.textContent = '';
    } else {
        passwordError.textContent = 'Password must be at least 8 characters long and contain at least one letter and one digit';
    }
}

// Add event listeners for input and form submission
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);

const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', function (event) {

    // Validate email and password
    validateEmail();
    validatePassword();

    // Check for validation errors
    if (emailError.textContent || passwordError.textContent) {
        // Prevent form submission if there are errors
        event.preventDefault();
    }
});
