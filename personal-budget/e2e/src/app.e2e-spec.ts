import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  // Test to display welcome message
  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Personal Budget');
  });

  it('should display subtitle message', () => {
    page.navigateTo();
    expect(page.getSubTitleText()).toEqual('A personal-budget management app');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
