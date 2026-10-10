export type AuthMode = 'login' | 'register';

export interface AuthFieldProps {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password';
  placeholder: string;
  icon: string;
  autocomplete: string;
  revealable?: boolean;
}

export interface AuthFormProps {
  mode: AuthMode;
  title: string;
  description: string;
  fields: AuthFieldProps[];
  submitText: string;
  googleText: string;
  footerText: string;
  footerLinkText: string;
  hasForgotLink: boolean;
}

export const LOGIN_FORM: AuthFormProps = {
  mode: 'login',
  title: 'Welcome Back!',
  description: 'Sign in to resume your games and progress.',
  fields: [
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'e.g. alex@minigames.com',
      icon: 'mail',
      autocomplete: 'email',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: '••••••••',
      icon: 'lock',
      autocomplete: 'current-password',
      revealable: true,
    },
  ],
  submitText: 'Login',
  googleText: 'Continue with Google',
  footerText: "Don't have an account?",
  footerLinkText: 'Register',
  hasForgotLink: true,
};

export const REGISTER_FORM: AuthFormProps = {
  mode: 'register',
  title: 'Create Account',
  description: 'Join MiniGames to track your score & streak.',
  fields: [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'e.g. CozyGamer_99',
      icon: 'person',
      autocomplete: 'username',
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'your.email@domain.com',
      icon: 'mail',
      autocomplete: 'email',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Min. 8 characters',
      icon: 'lock',
      autocomplete: 'new-password',
      revealable: true,
    },
    {
      name: 'confirm-password',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Repeat your password',
      icon: 'lock',
      autocomplete: 'new-password',
      revealable: true,
    },
  ],
  submitText: 'Create Account',
  googleText: 'Sign up with Google',
  footerText: 'Already have an account?',
  footerLinkText: 'Login',
  hasForgotLink: false,
};
