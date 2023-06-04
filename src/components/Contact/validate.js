const validate = (form) => {
  const errors = {};

  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const regexPhone = /^([0-9])*$/;

  if (form.name === "") {
    errors.name = "You must write the name";
  }
  if (!regexEmail.test(form.email)) {
    errors.email = "It must be a valid email";
  }
  if (!regexPhone.test(form.phone)) {
    errors.phone = "Only numbers";
  }
  if (form.phone === "") {
    errors.phone = "Enter the phone";
  }
  if (form.message.length === 0) {
    errors.message = "Write us a message";
  }
  return errors;
};

export default validate;