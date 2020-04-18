export function validateForm(fields, email, password) {
  console.log(fields);
  return email.length > 0 && password.length > 0;
}

export function validateConfirmationForm(code) {
  return code.length > 0;
}

export function validateSignIn(email, password) {
  return email.length > 0 && password.length > 0;
}
