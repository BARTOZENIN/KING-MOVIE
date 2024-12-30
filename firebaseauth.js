// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkydvO-JugqPF_vjp57DBZIxo_zDwiSRE",
  authDomain: "movie-dev-d6155.firebaseapp.com",
  projectId: "movie-dev-d6155",
  storageBucket: "movie-dev-d6155.firebasestorage.app",
  messagingSenderId: "655831807701",
  appId: "1:655831807701:web:155f3884e5cb0e8d3f145c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

// Adicionar dados ao Firestore após o login
const saveUserData = (user) => {
  const userRef = doc(db, "users", user.uid);
  const userData = {
    email: user.email,
    uid: user.uid,
    // Adicione outros campos que desejar
  };

  setDoc(userRef, userData)
    .then(() => {
      window.location.href = 'MOVIE_DEV.html';
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

// Lógica do botão de login
const entra = document.getElementById('entra');
entra.addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem('local', user.uid);
      saveUserData(user);  // Salva os dados do usuário no Firestore
    })
    .catch((error) => {
      console.error("Error signing in: ", error);
    });
});
