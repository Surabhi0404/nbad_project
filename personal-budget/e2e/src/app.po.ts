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

  checkCorrectImage(): Promise<string>{
    return element(by.css('pb-login img')).getAttribute('src') as Promise<string>;
   }

   getLoginCardTitle(): Promise<string>{
     return element(by.css('pb-login mat-card-title')).getText() as Promise<string>;
   }

   getSignInTabTitle(): Promise<string>{
     return element(by.id('mat-tab-label-0-0')).getText() as Promise<string>;
   }

   clickSignInTab(): Promise<void>{
     return element(by.id('mat-tab-label-0-0')).click() as Promise<void>;
   }

   enterUserEmail(): Promise<string>{
     element(by.id('mat-tab-label-0-0')).click();
     element(by.id('mat-input-0')).sendKeys('abcd@test.com');
      return element(by.id('mat-input-0')).getAttribute('value') as Promise<string>;
   }

   enterUserPassword(): Promise<string>{
     element(by.id('mat-tab-label-0-0')).click();
     element(by.id('mat-input-1')).sendKeys('abcdef');
     return element(by.id('mat-input-1')).getAttribute('value') as Promise<string>;
   }

   allowSignIn(): Promise<void>{
     element(by.id('mat-tab-label-0-0')).click();
     element(by.id('mat-input-0')).sendKeys('abcd@test.com');
     element(by.id('mat-input-1')).sendKeys('abcdef');
     return element(by.css('pb-login button')).click() as Promise<void>;
   }

   getSignUpTabTitle(): Promise<string>{
    return element(by.id('mat-tab-label-0-1')).getText() as Promise<string>;
  }

  clickSignUpTab(): Promise<void>{
    return element(by.id('mat-tab-label-0-1')).click() as Promise<void>;
  }

  enterUserName(): Promise<string>{
    element(by.id('mat-tab-label-0-1')).click();
    browser.sleep(200);
    element(by.id('mat-input-2')).sendKeys('abcd');
    return element(by.id('mat-input-2')).getAttribute('value') as Promise<string>;
  }

  enterUserEmailSignUp(): Promise<string>{
    element(by.id('mat-tab-label-0-1')).click();
    browser.sleep(200);
    element(by.id('mat-input-3')).sendKeys('abcdef@test.com');
    return element(by.id('mat-input-3')).getAttribute('value') as Promise<string>;
  }

  enterUserPasswordSignUp(): Promise<string>{
    element(by.id('mat-tab-label-0-1')).click();
    browser.sleep(200);
    element(by.id('mat-input-4')).sendKeys('abcdef');
    return element(by.id('mat-input-4')).getAttribute('value') as Promise<string>;
  }

  enterUserConfirmPassword(): Promise<string>{
    element(by.id('mat-tab-label-0-1')).click();
    browser.sleep(200);
    element(by.id('mat-input-5')).sendKeys('abcdef');
    return element(by.id('mat-input-5')).getAttribute('value') as Promise<string>;
  }

  allowSignUp(): Promise<void>{
    element(by.id('mat-tab-label-0-1')).click();
    browser.sleep(200);
    element(by.id('mat-input-2')).sendKeys('abcd');
    element(by.id('mat-input-3')).sendKeys('abcdef@test.com');
    element(by.id('mat-input-4')).sendKeys('abcdef');
    element(by.id('mat-input-5')).sendKeys('abcdef');
    browser.sleep(100);
    return element(by.css('pb-login button')).click() as Promise<void>;
  }

}
