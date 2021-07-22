/**
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 * @license MIT
 */

const parser = require('./parser');
const {to: toMendeley, from: fromMendeley} = require('./mendeley');

module.exports = {
  parser,
  toMendeley,
  fromMendeley,
};
