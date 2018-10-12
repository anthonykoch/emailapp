
export const create = {
  rules: {
    username: 'required|min:2|max:48|alpha_num|alpha_dash',
    first_name: 'required|min:1|max:48',
    last_name: 'required|min:1|max:48',
    email: 'required|email|unique_email',
    password: 'required|min:8|max:128|stripped',
  },
  messages: {
    'required.email': 'An email is required',
    'email.email': 'A valid email is required',
    'unique_email.email': 'This email is already taken',

    'required.first_name': 'Your first name is required',
    'max.first_name': 'Your first name can\'t be more than 80 characters',

    'required.last_name': 'Your last name is required',
    'max.last_name': 'Your last name can\'t be more than 80 characters',

    'required.password': 'You\'ve got to have a password! AAHHHHHHH',
    'min.password': 'Your password must be at least 8 characters',
    'max.password': 'Your password must be no more than 128 characters',
    'stripped.password': 'The password can not begin or end with whitespace',
  },
}
