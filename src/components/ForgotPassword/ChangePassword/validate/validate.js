export default function validate(input) {
    const errors = {};
    const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;

    if (!PASSWORD_REGEX.test(input.newPassword) && input.newPassword.length > 0) errors.newPassword = "Password must have at least 1 upper case letter , 1 number and be 8-20 characters long";
    if (input.repeatNewPassword.length !== input.newPassword.length || input.newPassword !== input.repeatNewPassword) errors.repeatNewPassword = "Password do not match";
    return errors;
}