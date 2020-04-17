export function validateForm(email, password) {
  return email.length > 0 && password.length > 0;
}

export function validateConfirmationForm(code) {
  return code.length > 0;
}
