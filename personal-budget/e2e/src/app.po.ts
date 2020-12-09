import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get('/') as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('pb-login h1')).getText() as Promise<string>;
  }

  getSubTitleText(): Promise<string>{
    return element(by.css('pb-login h2')).getText() as Promise<string>;
  }
}
