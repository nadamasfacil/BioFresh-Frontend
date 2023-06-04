export default function registerValidate(input) {
    const errors = {};
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
    const LETTERS_ONLY_REGEX = /^[a-zA-Z]+$/;

    if (!EMAIL_REGEX.test(input.email) && input.email.length > 0) errors.email = "Invalid email";
    if (!PASSWORD_REGEX.test(input.password) && input.password.length > 0) errors.password = "Password must have at least 1 upper case letter , 1 number and be 8-20 characters long";
    if (input.passwordRepeat.length !== input.password.length || input.password !== input.passwordRepeat) errors.passwordRepeat = "Password do not match";
    if (!LETTERS_ONLY_REGEX.test(input.firstname) && input.firstname.length > 0) errors.firstname = "First Name must not have numbers included";
    if (!LETTERS_ONLY_REGEX.test(input.lastname) && input.lastname.length > 0) errors.lastname = "Last Name must not have numbers included";

    return errors;
}