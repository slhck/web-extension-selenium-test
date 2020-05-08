import webdriver from 'selenium-webdriver';
import firefox from 'selenium-webdriver/firefox';
import path from 'path';

jest.setTimeout(1000 * 10);

describe(`test setup for firefox`, () => {
  let driver: webdriver.WebDriver;

  beforeAll(async () => {
    const firefoxExt = path.resolve(__dirname, '..', '..', 'extension', 'firefox.xpi');
    const firefoxOptions = new firefox.Options().addExtensions(firefoxExt);

    driver = new webdriver.Builder().forBrowser('firefox').setFirefoxOptions(firefoxOptions).build();
  });

  afterAll(async () => {
    // await driver.quit();
  });

  it('opens Google', async () => {
    await driver.get('http://google.com');
    expect(await driver.getTitle()).toEqual('Google');
  });
});
