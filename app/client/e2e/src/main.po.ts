import {browser, by, element} from 'protractor';

export class MainPage {
    navigateTo() {
        return browser.get('/');
    }

    getParagraphText() {
        return element(by.css('ferm-root h1')).getText();
    }
}
