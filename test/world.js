const puppeteer = require('puppeteer');
const sut = require('..');

module.exports = class {
  constructor({parameters}) {
    this.browser = parameters.browser;
    this.RIS = sut;
  }

  async read(str) {
    if (!this.browser) return this.RIS.read(str);
    return this.page.evaluate(str_ => RIS.read(str_), str);
  }

  async write(arr) {
    if (!this.browser) return this.RIS.write(arr);
    return this.page.evaluate(arr_ => RIS.write(arr_), arr);
  }

  async toMendeley(risContent) {
    if (!this.browser) return this.RIS.toMendeley(risContent);
    return this.page.evaluate(risContent_ => RIS.toMendeley(risContent_), risContent);
  }

  async fromMendeley(references) {
    if (!this.browser) return this.RIS.fromMendeley(references);
    return this.page.evaluate(references_ => RIS.fromMendeley(references_), references);
  }

  async toCSLJSON(risContent) {
    if (!this.browser) return this.RIS.toCSLJSON(risContent);
    return this.page.evaluate(risContent_ => RIS.toCSLJSON(risContent_), risContent);
  }

  async fromCSLJSON(references) {
    if (!this.browser) return this.RIS.fromCSLJSON(references);
    return this.page.evaluate(references_ => RIS.fromCSLJSON(references_), references);
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
