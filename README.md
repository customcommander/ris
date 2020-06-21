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

parse
  (`TY  - JOUR
    ER  - 
    TY  - BOOK
    ER  - 
    TY  - CHAP
    ER  - `);

//=> [ { "type": "JOUR" }
//=> , { "type": "BOOK" }
//=> , { "type": "CHAP" }
//=> ]
```

## Conversion Table

| Tag | Key  | Description    |
|:----|:-----|:---------------|
| TY  | type | Reference type |