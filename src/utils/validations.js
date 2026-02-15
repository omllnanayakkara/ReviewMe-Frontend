// Email Validation
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password) => {
  // Check for minimum length
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return "Password must include at least one lowercase letter.";
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return "Password must include at least one uppercase letter.";
  }

  // Check for at least one digit
  if (!/\d/.test(password)) {
    return "Password must include at least one digit.";
  }

  // Check for at least one special character
  if (!/[@$!%*?#&]/.test(password)) {
    return "Password must include at least one special character (e.g., @$!%*?&).";
  }

  // Return results
  return null;
};
