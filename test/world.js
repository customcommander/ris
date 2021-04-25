const puppeteer = require('puppeteer');
const sut = require('../');

module.exports = class {
  constructor({parameters}) {
    this.browser = parameters.browser;
    this.RIS = sut;
  }

  async parse(str) {
    if (!this.browser) return this.RIS(str);
    return this.page.evaluate(str_ => RIS(str_), str);
  }

  async parseMap(str) {
    if (!this.browser) return this.RIS.map(str);
    return this.page.evaluate(str_ => RIS.map(str_), str);
  }

  async toMendeley(risContent) {
    if (!this.browser) return this.RIS.toMendeley(risContent);
    return this.page.evaluate(risContent_ => RIS.toMendeley(risContent_), risContent);
  }
};

module.exports.init = async function () {
  if (!this.browser) return;
  this.browser_ = await puppeteer.launch({args: ['--no-sandbox']});
  this.page = await this.browser_.newPage();
  await this.page.addScriptTag({path: 'dist/browser.min.js'});
};

module.exports.destroy = async function() {
  if (!this.browser) return;
  await this.browser_.close();
};
