interface LoginLocators {
  emailInput: string;
  passwordInput: string;
  loginButton: string;
  alertMessage: any;
}

const loginLocators: LoginLocators = {
  emailInput: '[type="email"]',
  passwordInput: '[name="password"]',
  loginButton: 'button[type="submit"]',
  alertMessage: '[role="alert"]'
};

export default loginLocators;