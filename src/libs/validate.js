export function validateForm(email, password) {
  return email.length > 0 && password.length > 0;
}

export function validateConfirmationForm(code) {
  return code.length > 0;
}

export function validateSignIn(email, password) {
  return email.length > 0 && password.length > 0;
}

export function validateResetEmail(email) {
  return email.length > 0;
}

export function validateResetForm(password, confirmPassword) {
  return password.length > 0 && confirmPassword.length > 0;
}
