import { Given, When, Then, Before } from 'cucumber';
import { WelcomePage } from '../po/welcome.po';
import { browser } from 'protractor';

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

let page: WelcomePage;
const baseUrl = 'http://localhost:4200/';

Before( () => {
    page = new WelcomePage();
});

Given('that I am on the welcome page', () => {
    page.navigateTo();
});

When('I fill the login field with good login', () => {
    page.getLoginField().sendKeys('test');
});

When('I fill the password field with good password', () => {
    page.getPasswordField().sendKeys('1234');
});

When('I click on the login button', () => {
    page.getLoginButton().click();
});

When('I fill the login field with {string}', (login) => {
    page.getLoginField().sendKeys(login);
});

When('I fill the password field with {string}', (password) => {
    page.getPasswordField().sendKeys(password);
});

Then('I should not access the home page', (done) => {
    browser.getCurrentUrl().then((url) => {
        expect(url).equal(baseUrl);
        done();
    });
});

Then('I should access the home page', (done) => {
    browser.getCurrentUrl().then((url) => {
        expect(url).equal(baseUrl + 'home');
        done();
    });
});
