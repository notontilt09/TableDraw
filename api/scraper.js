const {Builder, By, Key, until} = require('selenium-webdriver');
require('chromedriver');

const driver = new Builder().forBrowser('chrome').build();

const getPlayerInfo = async (name, chips, options) => {
  const result = {};
  
  for (option in options) {
    result[option] = ''
  }

  result['name'] = name;
  result['chips'] = chips;


  await driver.get('https://www.thehendonmob.com/');
  await driver.findElement(By.className('header-search__field-input'))
        .sendKeys(`${name}`, Key.ENTER);
  const names = await driver.findElements(By.className('name'));
  if (names.length < 1) {
    console.log(`could not find ${name} in hendon mob`);
    return
  }
  else {
    console.log(`found ${name}`);
    await names[0].findElement(By.linkText(`${name}`)).click();
    if ('earnings' in result) {
      const totalCashes = await driver.wait(until.elementLocated(By.className('player-profile-info-total-live__value'))).getText();
      result['earnings'] = totalCashes;
    }
    if ('largest' in result) {
      const largestCash = await driver.wait(until.elementLocated(By.className('player-profile-info-fact__value'))).getText();
      result['largest'] = largestCash;
    }
    if ('nationality' in result) {
      const countrySpan = await driver.wait(until.elementLocated(By.className('player-profile-name__flag')));
      const country = await countrySpan.findElement(By.className('flag-small')).getText();
      result['nationality'] = country;
    }
    if ('buyin' in result) {
      let buyins = [];
      // grab the list of buyin strings
      const events = await driver.findElements(By.className('event_name'));
      // for each string
      events.forEach(async event => {
        let buyinString = await event.findElement(By.tagName('a')).getText();
        // remove the commas in the numbers
        buyinString = buyinString.replace(',', '');
        // find the first integer in the string
        let buyin = parseInt(buyinString.replace(/(^.+)(\w\d+\w)(.+$)/i,'$2'));
        buyins.push(buyin);
        console.log(buyins);
        // find average of the integers found in the loop above
      })

      result['buyin'] = buyins.reduce((a,b) => a + b, 0) / buyins.length
      console.log('buyins', buyins);
    }
  }
  console.log(`finished grabbing data for ${name}\n`, result)    
}



module.exports = { getPlayerInfo };