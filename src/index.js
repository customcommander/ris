/**
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 * @license MIT
 */

const read = require('./read');
const write = require('./write');
const {to: toMendeley, from: fromMendeley} = require('./mendeley');
const {to: toCSLJSON, from: fromCSLJSON} = require('./csl-json');

const parser = inp => {
  console.warning(`
    @customcommander/ris:
    The parser function has been deprecated in v5 and will be removed in v6.
    Please use the read function instead.
  `);
  return read(inp);
}

module.exports = {
  /** @deprecated */
  parser,
  read,
  write,
  toMendeley,
  fromMendeley,
  toCSLJSON,
  fromCSLJSON
};
