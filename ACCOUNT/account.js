// Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmdD8GB8tEmVaScAb0baoh5wyiwCgn0yM",
  authDomain: "veescome.firebaseapp.com",
  projectId: "veescome",
  storageBucket: "veescome.appspot.com",
  messagingSenderId: "432647553653",
  appId: "1:432647553653:web:8a889806f3816b9dbd2e3c",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

//   Signup function
let signUpButton = document.getElementById("signup");
signUpButton.addEventListener("click", (e) => {
  //prevent default form submission behaviour
  e.preventDefault();
  console.log("clicked");

  var email = document.getElementById("inputEmail");
  var password = document.getElementById("inputPassword");

  auth
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      location.reload();
      alert("user signed up successful");

      // signed in

      var user = userCredential.user;
      console.log("user, user.email");
    })

    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("error code", errorCode);
      console.log("error Message", errorMessage);
      alert(errorMessage);
    });
});

//  signin function

let signInButton = document.getElementById("signin");
signInButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("sign in clicked");

  var email = document.getElementById("inputEmail");
  var password = document.getElementById("inputPassword");

  auth
    .signInWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      var user = userCredential.user;
      console.log("user", user.email);
      window.location = "home.html";
      alert("user signed up successful");
    })

    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
});
