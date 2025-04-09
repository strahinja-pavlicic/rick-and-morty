import { useEffect, useState } from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext, AuthContextType } from "./authContext";
import { useAuthError } from "../hooks/useAuthError";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { getAuthError } = useAuthError();

  async function signup(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      return userCredential;
    } catch (error) {
      console.log(error);
      throw new Error(getAuthError(error, "signup"));
    }
  }

  async function login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      return userCredential;
    } catch (error) {
      throw new Error(getAuthError(error, "login"));
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setCurrentUser(null);
    return signOut(auth);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // If we have a user, verify the token
        try {
          const newToken = await user.getIdToken();
          if (newToken !== token) {
            localStorage.setItem("token", newToken);
          }
          setCurrentUser(user);
        } catch {
          // Token is invalid or expired
          localStorage.removeItem("token");
          setCurrentUser(null);
        }
      } else {
        // If we have a token but no user, the token is invalid
        if (token) {
          localStorage.removeItem("token");
        }
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
