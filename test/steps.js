const fs = require('fs');
const path = require('path');
const assert = require('assert').strict;
const { defineStep } = require('@cucumber/cucumber');

defineStep('I parse this content', async function (ris) {
  this.res = await this.parse(ris);
});

defineStep('I parse the content of {word}.ris', async function (file) {
  const content = fs.readFileSync(path.join(__dirname, 'samples', `${file}.ris`), 'utf-8');
  this.res = await this.parse(content);
});

defineStep('I get the result as shown in {word}.json', function (file) {
  const content = require(path.join(__dirname, 'samples', `${file}.json`), 'utf-8');
  assert.deepStrictEqual(this.res, content);
});

defineStep('I convert this content', async function (json) {
  const input = JSON.parse(json);
  this.res = await this.write(input);
});

defineStep('I convert this content to Mendeley', async function (risContent) {
  this.res = await this.toMendeley(risContent);
});

defineStep('I convert this content from Mendeley', async function (json) {
  this.res = await this.fromMendeley(JSON.parse(json));
});

defineStep('I get this result', function (str) {
  let expected;
  try {
    expected = JSON.parse(str);
  } catch (e) {
    expected = str;
  }
  assert.deepStrictEqual(this.res, expected);
});
