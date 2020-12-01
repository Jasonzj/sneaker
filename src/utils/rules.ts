export const usernameRules = {
  required: 'This is required.',
  minLength: {
    value: 5,
    message: 'The minimum length cannot exceed 5',
  },
  maxLength: {
    value: 20,
    message: 'The maximum length cannot exceed 20',
  },
}

export const passwordRules = {
  ...usernameRules,
  pattern: {
    value: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{1,}$/,
    message: 'At least one number and letter and no special characters',
  },
}
