export default function registerValidate(input) {
    const errors = {};
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const LETTERS_ONLY_REGEX = /^[a-zA-Z]+$/;

    if (!EMAIL_REGEX.test(input.email) && input.email.length > 0) errors.email = "Invalid email";
    if (!LETTERS_ONLY_REGEX.test(input.firstname) && input.firstname.length > 0) errors.firstname = "First Name must not have numbers included";
    if (!LETTERS_ONLY_REGEX.test(input.lastname) && input.lastname.length > 0) errors.lastname = "Last Name must not have numbers included";

    return errors;
}