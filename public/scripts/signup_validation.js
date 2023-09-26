// const emailInput = document.getElementById('email');
// const passwordInput = document.getElementById('password');
// const confirmPassword = document.getElementById('confirmPassword');
// const error = document.getElementById('error');
// const validationForm = document.getElementById('validation_form');

// const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
// const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// function validateEmail() {
//     console.log('validation');
//     if (emailPattern.test(emailInput.value)) {
//         error.textContent = '';
//     } else {
//         error.textContent = 'Invalid email format';
//     }
// }

// function validatePassword() {
//     if (passwordPattern.test(passwordInput.value)) {
//         error.textContent = '';
//     } else {
//         error.textContent = 'Password must be at least 8 characters long and contain at least one letter and one digit';
//     }
// }



// emailInput.addEventListener('input', validateEmail);
// passwordInput.addEventListener('input', validatePassword);

// validationForm.addEventListener('submit', function (event) {
//     if (!emailPattern.test(emailInput.value)) {
//         error.textContent = 'Invalid email format';
//         event.preventDefault();
//     }

//     if (!passwordPattern.test(passwordInput.value)) {
//         error.textContent = 'Password must be at least 8 characters long and contain at least one letter and one digit';
//         event.preventDefault();
//     }
//     if(confirmPassword.value !== passwordInput.value){
//         error.textContent = 'Second password is not matching'
//         event.preventDefault();
//     }
// });

// Select input elements
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

// Select error message elements
const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

// Regular expressions for validation
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phonePattern = /^[0-9]{10}$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// Function to validate each field
function validateUsername() {
    console.log('valida');
    if (usernameInput.value.trim() === '') {
        usernameError.textContent = 'Username is required';
    } else {
        usernameError.textContent = '';
    }
}

function validateEmail() {
    if (!emailPattern.test(emailInput.value)) {
        emailError.textContent = 'Invalid email format';
    } else {
        emailError.textContent = '';
    }
}

function validatePhone() {
    if (!phonePattern.test(phoneInput.value)) {
        phoneError.textContent = 'Invalid phone number (10 digits)';
    } else {
        phoneError.textContent = '';
    }
}

function validatePassword() {
    if (!passwordPattern.test(passwordInput.value)) {
        passwordError.textContent = 'Password must be at least 8 characters and include one letter and one digit';
    } else {
        passwordError.textContent = '';
    }
}

function validateConfirmPassword() {
    if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordError.textContent = 'Passwords do not match';
    } else {
        confirmPasswordError.textContent = '';
    }
}

// Add event listeners for input validation
usernameInput.addEventListener('input', validateUsername);
emailInput.addEventListener('input', validateEmail);
phoneInput.addEventListener('input', validatePhone);
passwordInput.addEventListener('input', validatePassword);
confirmPasswordInput.addEventListener('input', validateConfirmPassword);


const validationForm = document.getElementById('validation_form');

validationForm.addEventListener('submit', function (event) {
    // Validate all fields
    validateUsername();
    validateEmail();
    validatePhone();
    validatePassword();
    validateConfirmPassword();

    // Check for validation errors
    if (
        usernameError.textContent ||
        emailError.textContent ||
        phoneError.textContent ||
        passwordError.textContent ||
        confirmPasswordError.textContent
    ) {
        // If there are errors, prevent form submission
        event.preventDefault();
    }
});
