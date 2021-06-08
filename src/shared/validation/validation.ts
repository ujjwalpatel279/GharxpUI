const validationMessage = {
  enter: 'Please enter a valid',
  select: 'Please select a',
};

export const validation = {
  title: {
    types: { required: true },
    message: `${validationMessage.select} title`,
  },
  firstName: {
    types: { required: true, minLength: 2 },
    message: `${validationMessage.enter} first name`,
  },
  lastName: {
    types: { required: true, minLength: 2 },
    message: `${validationMessage.enter} last name`,
  },
  dob: {
    types: {
      required: true,
      day: { required: true, pattern: /\b(0?[0-9]|1[0-9]|2[0-9]|3[01])\b/ },
      month: { required: true, pattern: /\b(0?[0-9]|1[012])\b/ },
      year: { minLength: 4, maxLength: 4, required: true, pattern: /^(19|20)\d{2}$/ },
    },
    message: `${validationMessage.enter} date of birth`,
  },
  emailAddress: {
    types: { required: true, pattern: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/ },
    message: `${validationMessage.enter} email address`,
  },
  contactNumber: {
    types: { required: true, pattern: /^(\+)?([ 0-9]){8,20}$/ },
    message: `${validationMessage.enter} contact number`,
  },
};
