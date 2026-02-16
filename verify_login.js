import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAa12LeXUFFSFD3zHpORubayxlo91sah90",
    authDomain: "almighty-7a67a.firebaseapp.com",
    projectId: "almighty-7a67a",
    storageBucket: "almighty-7a67a.firebasestorage.app",
    messagingSenderId: "1039853506793",
    appId: "1:1039853506793:web:551de2c9340478cdd2e078"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const email = "gaani02@gmail.com";
const password = "Myfbpwrd@1";

console.log(`Attempting to login with ${email}...`);

signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("Login successful!");
        console.log("User UID:", user.uid);
    })
    .catch((error) => {
        console.error("Login failed:", error.code, error.message);
    });
