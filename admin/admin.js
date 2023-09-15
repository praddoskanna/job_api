const loginForm = document.getElementById("login-form");
const loginFormDiv = document.querySelector(".login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const adminContent = document.querySelector("main");

// Predefined username and password
const predefinedUsername = "Praveen";
const predefinedPassword = "Password";

// Function to handle form submission
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;

    if (enteredUsername === predefinedUsername && enteredPassword === predefinedPassword) {
        // Correct username and password, show admin content
        loginFormDiv.style.display = "none";
        adminContent.style.display = "block";

    } else {
        // Incorrect username or password, display an error message or take appropriate action
        alert("Incorrect username or password. Please try again.");
        passwordInput.value = "";
        usernameInput.value = "";
    }
});