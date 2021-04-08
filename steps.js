const fs = require('fs');
const path = require('path');
const assert = require('assert').strict;
const { defineStep } = require('@cucumber/cucumber');
const sut = require('./');

defineStep('I have this RIS file', function (file) {
  this.file = file;
});

defineStep('I have this file {word}', function (file) {
  this.file = fs.readFileSync(path.join(__dirname, 'samples', file), 'utf-8');
});

defineStep('I parse the file', function () {
  this.list = sut(this.file);
});

defineStep('I parse the file and rename the tags', function () {
  this.list = sut.map(this.file);
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
