import {MainPage} from './main.po';

describe('workspace-project App', () => {
    let page: MainPage;

    beforeEach(() => {
        page = new MainPage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Welcome to ferm!');
    });
});
