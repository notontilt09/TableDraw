const {Builder, By, Key, until} = require('selenium-webdriver');
require('chromedriver');

const driver = new Builder().forBrowser('chrome').build();

const findPlayer = async name => {
  await driver.get('https://www.thehendonmob.com/');
  await driver.findElement(By.className('header-search__field-input'))
        .sendKeys(`${name}`, Key.ENTER);
  const names = await driver.findElements(By.className('name'));
  if (names.length < 1) {
    console.log(`could not find ${name} in hendon mob`);
    return
  }
  else {
    console.log(`found name link for ${name}`);
    names[0].findElement(By.linkText(`${name}`)).click();
    const totalCashes = await driver.wait(until.elementLocated(By.className('player-profile-info-total-live__value'))).getText()
    console.log(totalCashes);
  }
  console.log(`finished grabbing data for ${name}`)    
}



module.exports = { findPlayer };