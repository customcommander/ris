const fs = require('fs');
const path = require('path');
const assert = require('assert').strict;
const { defineStep } = require('@cucumber/cucumber');

defineStep('I have this RIS file', function (file) {
  this.file = file;
});

defineStep('I convert this to Mendeley', async function (file) {
  this.list = await this.toMendeley(file);
});

defineStep('I convert this from Mendeley', async function (json) {
  const references = JSON.parse(json);
  this.risContent = await this.fromMendeley(references);
});

defineStep('I have this file {word}', function (file) {
  this.file = fs.readFileSync(path.join(__dirname, 'samples', file), 'utf-8');
});

defineStep('I parse the file', async function () {
  this.list = await this.parse(this.file);
});

defineStep('I parse the file and rename the tags', async function () {
  this.list = await this.parseMap(this.file);
});

defineStep('I will get a list of {int} reference(s)', function (count) {
  assert.equal(this.list.length, count);
});

defineStep('I will get a list of references as seen in file {word}', function (file) {
  const json = require(`./samples/${file}`)
  assert.deepStrictEqual(this.list, json);
});

defineStep('I will find a reference where {string} is set to {string}', function (field, value) {
  let expected_value;
  try {
    expected_value = JSON.parse(value);
  } catch (e) {
    expected_value = value; // it's a string
  }
  assert.deepStrictEqual(this.list[0][field], expected_value);
});

defineStep('I will find a reference where {string} is set to', function (field, value) {
  let expected_value;
  try {
    expected_value = JSON.parse(value);
  } catch (e) {
    expected_value = value; // it's a string
  }
  assert.deepStrictEqual(this.list[0][field], expected_value);
});

defineStep('I will find a reference with {word} as a key', function (key) {
  assert(typeof this.list[0][key] !== 'undefined');
});

// TODO: make this works for lists of more than one element.
defineStep('I will get this object', function (text) {
  const obj = JSON.parse(text);
  assert.deepStrictEqual(this.list[0], obj);
});

defineStep('I will get this RIS file', function (expected) {
  assert.deepStrictEqual(this.risContent, expected);
});
