const MIN_USERNAME_LENGTH = 2;
const MAX_USERNAME_LENGTH = 30;
const MIN_PASSWORD_LENGTH = 6;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const USERNAME_START_PATTERN = /^[A-Z]/;
const USERNAME_PATTERN = /^[A-Za-z0-9]+$/;
const UPPERCASE_PATTERN = /[A-Z]/;
const DIGIT_PATTERN = /\d/;
const SPECIAL_PATTERN = /[^A-Za-z0-9]/;
const PASSWORD_PATTERN = /^[!-~]+$/;

export const NO_ERROR = '';

export const ERRORS = {
  REQUIRED: 'This field is required',
  EMAIL: 'Enter an email like alex@minigames.com',
  USERNAME_LENGTH: `Use from ${MIN_USERNAME_LENGTH} to ${MAX_USERNAME_LENGTH} characters`,
  USERNAME_START: 'Start with an uppercase English letter',
  USERNAME_CHARACTERS: 'Use English letters and digits only',
  PASSWORD_LENGTH: `Use at least ${MIN_PASSWORD_LENGTH} characters`,
  PASSWORD_UPPERCASE: 'Add an uppercase English letter',
  PASSWORD_DIGIT: 'Add a digit',
  PASSWORD_SPECIAL: 'Add a special character, for example !',
  PASSWORD_CHARACTERS: 'Use English letters, digits and special characters',
  CONFIRM_PASSWORD: 'Passwords do not match',
};

export type ValidationRule =
  'email' | 'username' | 'password' | 'loginPassword' | 'confirmPassword';

function getEmailError(value: string): string {
  return EMAIL_PATTERN.test(value) ? NO_ERROR : ERRORS.EMAIL;
}

function getUsernameError(value: string): string {
  if (
    value.length < MIN_USERNAME_LENGTH ||
    value.length > MAX_USERNAME_LENGTH
  ) {
    return ERRORS.USERNAME_LENGTH;
  }
  if (!USERNAME_PATTERN.test(value)) {
    return ERRORS.USERNAME_CHARACTERS;
  }
  if (!USERNAME_START_PATTERN.test(value)) {
    return ERRORS.USERNAME_START;
  }
  return NO_ERROR;
}

function getPasswordError(value: string): string {
  if (value.length < MIN_PASSWORD_LENGTH) {
    return ERRORS.PASSWORD_LENGTH;
  }
  if (!PASSWORD_PATTERN.test(value)) {
    return ERRORS.PASSWORD_CHARACTERS;
  }
  if (!UPPERCASE_PATTERN.test(value)) {
    return ERRORS.PASSWORD_UPPERCASE;
  }
  if (!DIGIT_PATTERN.test(value)) {
    return ERRORS.PASSWORD_DIGIT;
  }
  if (!SPECIAL_PATTERN.test(value)) {
    return ERRORS.PASSWORD_SPECIAL;
  }
  return NO_ERROR;
}

function getLoginPasswordError(value: string): string {
  return value.length < MIN_PASSWORD_LENGTH ? ERRORS.PASSWORD_LENGTH : NO_ERROR;
}

function getConfirmPasswordError(value: string, password: string): string {
  return value !== password ? ERRORS.CONFIRM_PASSWORD : NO_ERROR;
}

export function getFieldError(
  rule: ValidationRule,
  value: string,
  password = NO_ERROR
): string {
  if (!value) {
    return ERRORS.REQUIRED;
  }

  switch (rule) {
    case 'email':
      return getEmailError(value);
    case 'username':
      return getUsernameError(value);
    case 'password':
      return getPasswordError(value);
    case 'loginPassword':
      return getLoginPasswordError(value);
    case 'confirmPassword':
      return getConfirmPasswordError(value, password);
  }
}
