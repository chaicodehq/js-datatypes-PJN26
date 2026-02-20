/**
 * 📋 Jugaad Form Validator - Indian Style!
 *
 * India mein form bharna ek art hai! College admission ka form validate
 * karna hai. Har field ke apne rules hain. Tujhe ek errors object return
 * karna hai jisme galat fields ke error messages hain. Agar sab sahi hai
 * toh empty errors object aur isValid = true.
 *
 * formData object:
 *   { name, email, phone, age, pincode, state, agreeTerms }
 *
 * Validation Rules:
 *   1. name: must be a non-empty trimmed string, min 2 chars, max 50 chars
 *      Error: "Name must be 2-50 characters"
 *
 *   2. email: must be a string containing exactly one "@" and at least one "."
 *      after the "@". Use indexOf(), lastIndexOf(), includes().
 *      Error: "Invalid email format"
 *
 *   3. phone: must be a string of exactly 10 digits, starting with 6, 7, 8, or 9
 *      (Indian mobile numbers). Check each char is a digit.
 *      Error: "Invalid Indian phone number"
 *
 *   4. age: must be a number between 16 and 100 inclusive, and an integer.
 *      JUGAAD: Agar string mein number diya hai (e.g., "22"), toh parseInt()
 *      se convert karo. Agar convert nahi ho paya (isNaN), toh error.
 *      Error: "Age must be an integer between 16 and 100"
 *
 *   5. pincode: must be a string of exactly 6 digits, NOT starting with "0"
 *      Error: "Invalid Indian pincode"
 *
 *   6. state: Use optional chaining (?.) and nullish coalescing (??) -
 *      if state is null/undefined, treat as "". Must be a non-empty string.
 *      Error: "State is required"
 *
 *   7. agreeTerms: must be truthy (Boolean(agreeTerms) === true).
 *      Falsy values: 0, "", null, undefined, NaN, false
 *      Error: "Must agree to terms"
 *
 * Return:
 *   { isValid: boolean, errors: { fieldName: "error message", ... } }
 *   - isValid is true ONLY when errors object has zero keys
 *
 * Hint: Use typeof, Boolean(), parseInt(), isNaN(), Number.isInteger(),
 *   ?. (optional chaining), ?? (nullish coalescing), Object.keys(),
 *   startsWith(), trim(), length
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 *
 * @example
 *   validateForm({
 *     name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
 *     age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
 *   })
 *   // => { isValid: true, errors: {} }
 *
 *   validateForm({
 *     name: "", email: "bad-email", phone: "12345", age: 10,
 *     pincode: "0123", state: null, agreeTerms: false
 *   })
 *   // => { isValid: false, errors: { name: "...", email: "...", ... } }
 */
export function validateForm(formData) {
  // Your code here
  let isValid = true;
  const validation = { isValid, errors: {} };
  if(formData.name.trim().length < 2 || formData.name.trim().length > 50) {
    validation.errors.name = "Name must be 2-50 characters";
    validation.isValid = false;
  }

  if(typeof formData.email !== "string" || !formData.email.includes("@") || formData.email.indexOf("@") != formData.email.lastIndexOf("@") || !formData.email.includes(".")) {
    validation.errors.email = "Invalid email format";
    validation.isValid = false;
  }

  const phoneStart = ["6", "7", "8", "9"];

  if(typeof formData.phone !== "string" || formData.phone.length != 10 || !phoneStart.includes(formData.phone.charAt(0)) || !/^\d+$/.test(formData.phone)) {
    validation.errors.phone = "Invalid Indian phone number";
    validation.isValid = false;
  }

  let age = parseInt(formData.age);
  if(typeof age !== "number" || isNaN(age) || !Number.isInteger(parseFloat(formData.age)) || age < 16 || age > 100) {
    validation.errors.age = "Age must be an integer between 16 and 100";
    validation.isValid = false;
  }

  if(typeof formData.pincode !== "string" || formData.pincode.length != 6 || formData.pincode.startsWith("0") || !/^\d+$/.test(formData.pincode)) {
    validation.errors.pincode = "Invalid Indian pincode";
    validation.isValid = false;
  }

  if(typeof formData.state !== "string" || !(formData?.state ?? "").length) {
    validation.errors.state = "State is required";
    validation.isValid = false;
  }

  if(!Boolean(formData.agreeTerms)) {
    validation.errors.agreeTerms = "Must agree to terms";
    validation.isValid = false;
  }

  return validation;
}
