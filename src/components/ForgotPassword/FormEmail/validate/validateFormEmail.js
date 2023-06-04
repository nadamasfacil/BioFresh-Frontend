export default function registerFormEmail(input) {
    const errors = {};
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const LETTERS_ONLY_REGEX = /^[a-zA-Z]+$/;

    if (!EMAIL_REGEX.test(input.email) && input.email.length > 0) errors.email = "Invalid email";

    return errors;
}