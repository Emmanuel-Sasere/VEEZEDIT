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

auth.onAuthStateChanged(function (user) {
  if (user) {
    var email = user.email;
    var user = document.getElementById("user");
    var text = document.createTextNode(email);
    user.appendChild(text);
    console.log(user);
    // is signed in
  } else {
    alert("user not authenticated, kindly login or signup");
    window.location = "account.html";
  }
});

//   logout function

let signOutButton = document.getElementById("signout");
signOutButton.addEventListener("click", (e) => {
  e.preventDefault();
  alert("signed out");
  window.location = "account.html";
});
