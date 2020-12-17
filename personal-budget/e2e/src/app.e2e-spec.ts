'use strict';
import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';
import { Eyes, Target, BatchInfo, RectangleSize } from '@applitools/eyes-protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  let eyes: Eyes;
  beforeAll(() => {
    browser.waitForAngularEnabled(false);

  })
  beforeEach(async () => {
    page = new AppPage();
    eyes = new Eyes();
    eyes.setApiKey('719m36SjRkH108zMLkvvWCrbwH7rND3vEqIBwcZeXy198110'); // 👈🏼 REPLACE ME!
    eyes.setBatch(new BatchInfo('Personal Budget'))
  });

  // Test to display App Title
  it('should display App title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Personal Budget');
  });

  // Test to display App Subtitle
  it('should display App subtitle', () => {
    page.navigateTo();
    expect(page.getSubTitleText()).toEqual('A personal-budget management app');
  });

  // Test to check correct Image is displayed
  it('should display correct image', async () => {
    page.navigateTo();
    expect(page.checkCorrectImage()).toContain('assets/wallet.png');
  });

  // Test to check correct Title of SignIn/SignUp card
  it('should display SignIn/SignUp Card Title', () => {
    page.navigateTo();
    expect(page.getLoginCardTitle()).toEqual('SignIn/SignUp');
  });

  // Test to check correct SignIn tab Title
  it('should check SingIn tab Title', () => {
    page.navigateTo();
    expect(page.getSignInTabTitle()).toEqual('Sign In');
  });

  // Test to check SignIn tab is clickable
  it('should click SingIn tab', () => {
    page.navigateTo();
    expect(page.clickSignInTab());
  });

  //Test to check user can enter User Email
  it('should allow to enter User Email', function() {
    page.navigateTo();
    expect(page.enterUserEmail()).toBe('abcd@test.com');
  });

  // Test to check user can enter User Password
  it('should allow to enter User Password', function() {
    page.navigateTo();
    expect(page.enterUserPassword()).toBe('abcdef');
  });

  // Test to check User is allowed to SignIn after correct input to fields
  it('should allow signIn', function(){
    page.navigateTo();
    expect(page.allowSignIn());
  });

  // Test to check correct SignUp tab title
  it('should check SingUp tab Title', () => {
    page.navigateTo();
    expect(page.getSignUpTabTitle()).toEqual('Sign Up');
  });

  // Test to check SignUp tab is clickable
  it('should click SingUp tab', () => {
    page.navigateTo();
    expect(page.clickSignUpTab());
  });

  // Test to check user can enter UserName for SignUp
  it('should allow to enter UserName', () => {
    page.navigateTo();
    expect(page.enterUserName()).toBe('abcd');
  });

  // Test to check user can enter User Email for SignUp
  it('should allow to enter User SignUp Email', () => {
    page.navigateTo();
    expect(page.enterUserEmailSignUp()).toBe('abcdef@test.com');
  })

  //Test to check user can enter User Password for SignUp
  it('should allow to enter User SignUp Password', () => {
    page.navigateTo();
    expect(page.enterUserPasswordSignUp()).toBe('abcdef');
  });

  // Test to check user can enter User Confirm Password for SignUp
  it('should allow to enter User SignUp Confirm Password', () => {
    page.navigateTo();
    expect(page.enterUserConfirmPassword()).toBe('abcdef');
  });

  // Test to check user is allowed to SignUp on correct input of required fields
  it('should allow SignUp', ()=>{
    page.navigateTo();
    expect(page.allowSignUp());
  });

  // Applitools Visual Regression Testing
  it('Smoke Test', async() => {
    await eyes.open(browser, 'Personal Budget', 'Smoke Test', new RectangleSize(800, 600));
    await browser.get('/');
    await eyes.check("Personal Budget", Target.window().fully);
    element(by.id('mat-tab-label-0-1')).click();
    browser.sleep(200);
    element(by.id('mat-input-2')).sendKeys(Math.random().toString(36).substring(7));
    element(by.id('mat-input-3')).sendKeys(Math.random().toString(36).substring(7)+'@test.com');
    element(by.id('mat-input-4')).sendKeys('abcdef');
    element(by.id('mat-input-5')).sendKeys('abcdef');
    browser.sleep(100);
    element(by.css('pb-login button')).click();
    await eyes.check("Dashboard", Target.window().fully);
    const results = await eyes.close();
    console.log(results);
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
