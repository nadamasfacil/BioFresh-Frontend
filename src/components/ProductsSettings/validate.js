const validate = (form) => {
  const errors = {};

  const regexNumber = /^([0-9])*$/;
  const regexPrice = /^\d+(\.\d{1,2})?$/;

  if (form.name === "") {
    errors.name = "You must write the name";
  }
  console.log(form.name);
  if (!regexNumber.test(form.stock)) {
    errors.stock = "Only numbers";
  }
  if (form.stock === "") {
    errors.stock = "Enter the stock";
  }
  if (!regexPrice.test(form.price)) {
    errors.price = "Only money";
  }
  if (form.price === "") {
    errors.price = "Enter the price";
  }
  if (form.image === "") {
    errors.image = "Select a image";
  }
  if (form.description === "") {
    errors.description = "Write us a description";
  }
  return errors;
};

export default validate;
