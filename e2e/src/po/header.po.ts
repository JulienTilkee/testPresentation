import { element, by } from 'protractor';

export class Header {
    getHeader() {
        return element(by.tagName('app-header div'));
    }

    getHeaderTitle() {
        return element(by.id('appTitle'));
    }

    getHeaderButton() {
        return element(by.id('changeColors'));
    }
}
