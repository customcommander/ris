const assert = require('assert').strict;
const { defineStep } = require('cucumber');
const sut = require('./');

defineStep('I have this RIS file', function (file) {
  this.file = file;
});

defineStep('I parse the file', function () {
  this.list = sut(this.file);
});

defineStep('I will get a list of references', function () {
  assert(this.list.length > 0);
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
