import { browser, by, element } from 'protractor';

export class WelcomePage {
  navigateTo() {
    return browser.get('/');
  }

  getLoginField() {
    return element(by.css('#logInput'));
  }

  getPasswordField() {
    return element(by.css('#pwdInput'));
  }

  getLoginButton() {
    return element(by.css('#loginButton'));
  }
}
