# RIS

A package for parsing bibliographic content in the [RIS format][ris-file-format].

[ris-file-format]: https://en.wikipedia.org/wiki/RIS_(file_format)

## Install

```
yarn add @customcommander/ris
```

or

```
npm -i @customcommander/ris
```

## Usage

```javascript
const parse = require('@customcommander/ris');

parse(`
TY  - JOUR
ER  - 
TY  - BOOK
ER  - 
TY  - CHAP
ER  - 
`);

//=> [ { "type": "JOUR" }
//=> , { "type": "BOOK" }
//=> , { "type": "CHAP" }
//=> ]
```

## Conversion Table

| Tag | Key      | Description      |
|:----|:---------|:-----------------|
| TY  | type     | Reference type   |
| AB  | abstract | Abstract         |
| DA  | date     | Date             |
| KW  | keyword  | Keywords         |
| PY  | pub_year | Publication year |
| UR  | url      | Web/URL          |

## Development

The following command will:

1.  Compile the grammar.
2.  Test the grammar against the `sample.ris` file.
3.  Output the result to the standard output.
4.  Write the output to `out.txt`. (This file is ignored by Git.)

```
make sample
```
