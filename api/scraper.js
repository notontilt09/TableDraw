const {Builder, By, Key, until} = require('selenium-webdriver');
require('chromedriver');

const driver = new Builder().forBrowser('chrome').build();

const findPlayer = async name => {
  await driver.get('https://www.thehendonmob.com/');
  await driver.findElement(By.className('header-search__field-input'))
        .sendKeys(`${name}`, Key.ENTER);
}

module.exports = { findPlayer };