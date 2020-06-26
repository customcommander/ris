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

| Tag | Key            | Description                                   |
|:----|:---------------|:----------------------------------------------|
| TY  | type           | Reference type                                |
| AB  | abstract       | Abstract                                      |
| AD  | author_address | Author address                                |
| AN  | acc_number     | Accession number                              |
| AV  | arch_loc       | Location in archives                          |
| C1  | custom         | Custom field 1; entry 0 in the `custom` array |
| C2  | custom         | Custom field 2; entry 1 in the `custom` array |
| C3  | custom         | Custom field 3; entry 2 in the `custom` array |
| C4  | custom         | Custom field 4; entry 3 in the `custom` array |
| C5  | custom         | Custom field 5; entry 4 in the `custom` array |
| C6  | custom         | Custom field 6; entry 5 in the `custom` array |
| C7  | custom         | Custom field 7; entry 6 in the `custom` array |
| C8  | custom         | Custom field 8; entry 7 in the `custom` array |
| CA  | caption        | Caption                                       |
| CN  | call_number    | Call number                                   |
| CY  | pub_loc        | Place published                               |
| DA  | date           | Date                                          |
| DB  | db_name        | Database name                                 |
| DB  | db_provider    | Database provider                             |
| DO  | doi            | DOI (Digital Object Identifier)               |
| KW  | keyword        | Keywords                                      |
| PY  | pub_year       | Publication year                              |
| RP  | reprint        | Reprint status                                |
| RP  | reprint_date   | Reprint date when status is "ON REQUEST"      |
| UR  | url            | Web/URL                                       |

## Development

The following command will:

1.  Compile the grammar.
2.  Test the grammar against the `sample.ris` file.
3.  Output the result to the standard output.
4.  Write the output to `out.txt`. (This file is ignored by Git.)

```
make sample
```
