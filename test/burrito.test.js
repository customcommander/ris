/*
    IMPORTANT - README

    It is entirely possible to have all your tests passing
    **and** distribute a broken NPM package.

    This is an attempt to detect packaging issues
    that are likely to be missed during development.

    Examples:

    1.  A dependency has been included as a dev dependency.
    2.  A file hasn't been added to the package.json `files` field.

    It is **not** a test for correctness.

    The objective is to make sure that the NPM artefact
    has been packaged correctly.

    See also Makefile.
*/

const parse = require('@customcommander/ris');
const assert = require('assert').strict;

const records = parse(`
TY  - JOUR
TI  - The Burrito Test
UR  - https://github.com/customcommander/ris
ER  - 
`);

assert(records.length > 0);
