// validator.js

export function createValidator() {
  let errors = {}; // Private state

  // Private validation rules
  const rules = {
    name: value => value.trim().length >= 3 || "Name must be at least 3 characters.",
    email: value => /^\S+@\S+\.\S+$/.test(value) || "Email must be valid.",
    password: value => value.length >= 8 || "Password must be at least 8 characters.",
    confirmPassword: (value, allFields) => value === allFields.password || "Passwords must match.",
  };

  // Validate a specific field
  function validateField(field, value, allFields) {
    const rule = rules[field];
    if (!rule) return;

    const isValid = rule(value, allFields);
    if (isValid === true) {
      delete errors[field];
    } else {
      errors[field] = isValid;
    }
  }

  // Get current errors
  function getErrors() {
    return { ...errors }; // Return a shallow copy
  }

  // Reset all errors
  function reset() {
    errors = {};
  }

  return {
    validateField,
    getErrors,
    reset,
  };
}
