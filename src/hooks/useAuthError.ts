import { FirebaseError } from "firebase/app";

type AuthErrorType = "login" | "signup";

export function useAuthError() {
  const getAuthError = (error: unknown, type: AuthErrorType): string => {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/invalid-credential":
          return "Invalid credentials";

        case "auth/weak-password":
          return "Password should be at least 6 characters";

        case "auth/email-already-in-use":
          return "Email already in use";

        default:
          return type === "login"
            ? "Failed to sign in. Please try again."
            : "Failed to create account. Please try again.";
      }
    }
    return "An unexpected error occurred";
  };

  return { getAuthError };
}
