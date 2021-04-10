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

//=> [ { TY: "JOUR" }
//=> , { TY: "BOOK" }
//=> , { TY: "CHAP" }
//=> ]
```

## Mapping Tag

RIS tags are quite terse. They can be mapped to human-friendly names:

```javascript
const parse = require('@customcommander/ris');

parse(`
TY  - JOUR
AB  - this is my abstract
ER  - 
`);

//=> [ { TY: "JOUR"
//=>   , AB: "this is my abstract"
//=>   }
//=> ]

// vs

parse.map(`
TY  - JOUR
AB  - this is my abstract
ER  - 
`);

//=> [ { '@type': "Journal"
//=>   , abstract: "this is my abstract"
//=>   }
//=> ]
```

See the complete [map for each type of RIS reference](./resources/fields-map.csv).


## Reference Types

See [list of reference types](./resources/types.csv). Based on https://en.wikipedia.org/wiki/RIS_(file_format).

## Development

The following command will:

1.  Compile the grammar.
2.  Test the grammar against the [dev.ris](./resources/dev.ris) file.
3.  Output the result to the standard output.
4.  Write the output to `out.txt`. (This file is ignored by Git.)

```
make sample
```
