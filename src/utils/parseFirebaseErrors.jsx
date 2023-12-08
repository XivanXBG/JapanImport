export const parseFirebaseError = (errorCode) => {
  switch (errorCode) {
    case "auth/user-not-found":
      return "User not found. Please check your email or register.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/invalid-login-credentials":
      return "Invalid login credentials. Please double-check your username/email and password.";
    case "auth/email-already-in-use":
      return "Email is already in use. Please use a different email or try logging in.";
    case "auth/invalid-email":
      return "Invalid email address. Please enter a valid email.";
    case "auth/weak-password":
      return "Weak password. Please choose a stronger password.";

    default:
      return "An error occurred. Please try again.";
  }
};
