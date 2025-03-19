import { useEffect, useState } from "react";
import { auth } from "../utils/auth/firebase";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import axios from "axios";


export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signup(email, password, username) {
    const { data } = await axios.get("http://localhost:3000/auth/checkUsername", {
      params: { username },
    });

    if (!data.isAvailable) {
      throw new Error("username is already taken.");
    }

    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(userCredentials.user);

    localStorage.setItem(
      "username",
      JSON.stringify({ value: username, timestamp: Date.now() })
    );
    return userCredentials;
  }

  async function login(email, password) {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (!userCredentials.user.emailVerified) {
      throw new Error("please verify your email before logging in!");
    }
    return userCredentials;
  }

  async function logout() {
    return await signOut(auth);
  }

  async function resetPassword(email) {
    return await sendPasswordResetEmail(auth, email);
  }

  // async function checkVerification() {
  //   const user = auth.currentUser;
  //   if (user) {
  //     await user.reload();
  //     if (user.emailVerified) {
  //       setCurrentUser(user); // email verified successfully
  //     }
  //   }
  // }

useEffect(() => {
    let isRequestSent = false; // Prevent multiple requests on rapid reload

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const savedData = JSON.parse(localStorage.getItem("username"));
      const EXPIRY_TIME = 24 * 60 * 60 * 1000;

      if (savedData && Date.now() - savedData.timestamp > EXPIRY_TIME) {
        localStorage.removeItem("username");
        return;
      }

      if (user) {
        await user.reload();

        if (user.emailVerified) {
          setCurrentUser(user);

          if (!isRequestSent && savedData?.value) {
            isRequestSent = true;

            try {
              const { data } = await axios.get(
                "http://localhost:3000/checkUsername",
                { params: { username: savedData.value } }
              );

              if (!data.isAvailable) {
                console.error("Username taken.");
                localStorage.removeItem("username");
                return;
              }

              await axios.post("http://localhost:3000/auth/signup", {
                firebaseUid: user.uid,
                email: user.email,
                username: savedData.value,
              });

              localStorage.removeItem("username"); 
            } catch (error) {
              console.error("Error sending data:", error.message);
            }
          }
        } else {
          setCurrentUser(null); // Unverified users are blocked
        }
      } else {
        setCurrentUser(null); // No user logged in
      }

      setLoading(false); 
    });

    return unsubscribe;
  }, []);


  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
