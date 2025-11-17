import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDOZPd9ZS4c2A1-3v-mbJt3vKqKGFiAnpI",
    authDomain: "linkedin-login-7705c.firebaseapp.com",
    projectId: "linkedin-login-7705c",
    storageBucket: "linkedin-login-7705c.firebasestorage.app",
    messagingSenderId: "239296986266",
    appId: "1:239296986266:web:9090865813124b953c3323"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// submit button
const submitSignIn = document.getElementById('signInBtn');
submitSignIn.addEventListener("click", function (event){
    event.preventDefault()

    // Inputs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth=getAuth()

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Sign In...
        const user = userCredential.user;
        alert("Logging in...")
        window.location.href = "grand.html"
        //...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
    })
})

