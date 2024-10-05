import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBJorDWwsAnImVAI4jrzXL7P_PQLrE0G8s",
  authDomain: "amicable-chatapp.firebaseapp.com",
  projectId: "amicable-chatapp",
  storageBucket: "amicable-chatapp.appspot.com",
  messagingSenderId: "964738871236",
  appId: "1:964738871236:web:9ab290cc742aad03c37e91",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const User = res.user;

    // Save user info in Firestore
    await setDoc(doc(db, "users", User.uid), {
      id: User.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey, add your bio here",
      lastSeen: Date.now(),
    });

    // Initialize empty chats
    await setDoc(doc(db, "chats", User.uid), {
      chatData: [],
    });

    toast.success("Account created successfully!");
    console.log("User registered and data saved!");

    // Return true on successful sign up
    return true;
  } catch (error) {
    console.error("Error writing to Firestore:", error);
    toast.error(error.code.split("/")[1].split("-").join(""));

    // Return false if there's an error
    return false;
  }
};

const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log("Login successful:", user);
    toast.success("Login successful!");
    return true;
  } catch (error) {
    console.error("Error during login:", error);
    toast.error(error.code.split("/")[1].split("-").join(""));
    return false;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error during login:", error);
    toast.error(error.code.split("/")[1].split("-").join(""));
  }
};

export { signup, login, logout, auth, db, doc };
