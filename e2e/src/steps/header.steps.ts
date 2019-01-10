import { When, Then, Before } from 'cucumber';
import { Header } from '../po/header.po';

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

let header: Header;

Before( () => {
    header = new Header();
});

When('I click on the eye button', () => {
    header.getHeaderButton().click();
});

Then('I should invert the header\'s background color',  () => {
    header.getHeader().getCssValue('background-color').then( (bgColor) => {
        expect(bgColor).equal('rgba(0, 0, 0, 1)');
    });
});

Then('I should invert the header\'s title color',  () => {
    header.getHeaderTitle().getCssValue('color').then( (color) => {
        expect(color).equal('rgba(255, 255, 255, 1)');
    });
});
