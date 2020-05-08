import webdriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import firefox from 'selenium-webdriver/firefox';
import browserConfig from './config.json';
import path from 'path';

jest.setTimeout(1000 * 10);

const browsers = process.env.BROWSER ? [process.env.BROWSER] : browserConfig.browsers;

browsers.forEach((browser) => {
  describe(`test setup for ${browser}`, () => {
    let driver: webdriver.WebDriver;

    beforeAll(async () => {
      const chromeExtDir = path.resolve(__dirname, '..', '..', 'extension', 'chrome');
      const chromeOptions = new chrome.Options().addArguments(`--load-extension=${chromeExtDir}`);

      const firefoxExt = path.resolve(__dirname, '..', '..', 'extension', 'firefox.xpi');
      const firefoxOptions = new firefox.Options().addExtensions(firefoxExt);

      driver = new webdriver.Builder()
        .forBrowser(browser)
        .setChromeOptions(chromeOptions)
        .setFirefoxOptions(firefoxOptions)
        .build();
    });

    afterAll(async () => {
      await driver.quit();
    });

    it('opens Google', async () => {
      await driver.get('http://google.com');
      expect(await driver.getTitle()).toEqual('Google');
    });
  });
});
