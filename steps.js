const assert = require('assert').strict;
const { defineStep } = require('cucumber');
const sut = require('./');

defineStep('I have this RIS file', function (file) {
  this.file = file;
});

defineStep('I parse the file', function () {
  this.list = sut(this.file);
});

defineStep('I get this list', function (docstring) {
  const expected_list = JSON.parse(docstring);
  assert.deepStrictEqual(this.list, expected_list);
});
