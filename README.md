# RIS

Read/write bibliographic records in [RIS format][ris-file-format].

## Getting Started

Whether you intend to use it on Node.js or in a browser you must grab a copy of `@customcommander/ris` using your favourite Node.js package manager e.g.,

```
npm i @customcommander/ris
```

### Node.js

```javascript
const RIS = require('@customcommander/ris');

RIS(`
TY  - JOUR
TI  - Foo
ER  - 
TY  - BOOK
TI  - Bar
ER  - 
TY  - CHAP
TI  - Baz
ER  - 
`);
//=> [ {TY: 'JOUR', TI: 'Foo'}
//=> , {TY: 'BOOK', TI: 'Bar'}
//=> , {TY: 'CHAP', TI: 'Baz'}]
```

### Browser

```html
<script src="./node_modules/@customcommander/ris/dist/browser.min.js"></script>

<script>
RIS(`
TY  - JOUR
ER  - 
TY  - BOOK
ER  - 
TY  - CHAP
ER  - 
`);
//=> [ {TY: 'JOUR', TI: 'Foo'}
//=> , {TY: 'BOOK', TI: 'Bar'}
//=> , {TY: 'CHAP', TI: 'Baz'}]
</script>
```


## Mapping Tag

RIS tags are quite terse. They can be mapped to human-friendly names:

```javascript
const RIS = require('@customcommander/ris');

RIS(`
TY  - JOUR
AB  - this is my abstract
ER  - 
`);
//=> [{TY: "JOUR", AB: "this is my abstract"}]

// vs

RIS.map(`
TY  - JOUR
AB  - this is my abstract
ER  - 
`);
//=> [{'@type': "Journal", abstract: "this is my abstract"}]
```

See the complete [map for each type of RIS reference](./resources/fields-map.csv).


## Reference Types

See [list of reference types](./resources/types.csv). Based on https://en.wikipedia.org/wiki/RIS_(file_format).

## Mendeley

Bibliographic records in RIS format can be converted to Mendeley references:

```javascript
RIS.toMendeley(`
TY  - JOUR
TI  - Mission to the Moon
AU  - Armstrong, Neil
DA  - 1969/07/20
ER  - 
`);
//=> [{ type: 'journal'
//=>  , authors: [{last_name: 'Armstrong', first_name: 'Neil'}]
//=>  , accessed: '1969-07-20'
//=>  , title: 'Mission to the Moon' }]
```

**Warning:** not all RIS fields can be mapped to a Mendeley fields. The following tables show which RIS fields are supported by Mendeley.

**Warning:** each Mendeley references is validated before it is returned. If one field in the reference is invalid the _entire_ reference is discarded. e.g.,


```javascript
RIS.toMendeley(`
TY  - JOUR
AU  - Armstrong, Neil
DA  - 1969/07/20
ER  - 
`);
//=> []
// In Mendeley all references MUST have a title!
```

### All Records

| RIS | Mendeley         |
|:----|:-----------------|
| A1  | authors          |
| A2  | editors          |
| A3  | authors          |
| A4  | authors          |
| AB  | abstract         |
| AN  | identifiers.pmid |
| AU  | authors          |
| CY  | city             |
| DA  | accessed         |
| DO  | identifiers.doi  |
| ET  | edition          |
| IS  | issue            |
| KW  | keywords         |
| L1  | websites         |
| L4  | websites         |
| LA  | language         |
| LB  | tags             |
| N1  | notes            |
| PB  | publisher        |
| PY  | year             |
| RN  | notes            |
| SE  | chapter          |
| SN  | identifiers.isbn |
| SP  | pages            |
| ST  | short_title      |
| T2  | source           |
| T3  | series           |
| TA  | authors          |
| TI  | title            |
| UR  | websites         |
| VL  | volume           |

### PAT Records

| RIS | Mendeley                  |
|:----|:--------------------------|
| C6  | patent_legal_status       |
| M1  | patent_application_number |

### JOUR & JFULL Records

| RIS | Mendeley         |
|:----|:-----------------|
| SN | identifiers.issn |

### RPRT Records

| RIS | Mendeley         |
|:----|:-----------------|
| VL  | series_number    |

### Types Conversion

| RIS       | Mendeley               |
|:----------|:-----------------------|
| BILL      | bill                   |
| BOOK      | book                   |
| CASE      | case                   |
| CHAP      | book_section           |
| COMP      | computer_program       |
| CONF      | conference_proceedings |
| ENCYC     | encyclopedia_article   |
| GEN       | generic                |
| HEAR      | hearing                |
| ICOMM     | web_page               |
| JFULL     | journal                |
| JOUR      | journal                |
| MGZN      | magazine_article       |
| MPCT      | film                   |
| NEWS      | newspaper_article      |
| PAT       | patent                 |
| RPRT      | report                 |
| STAT      | statute                |
| THES      | thesis                 |
| UNPB      | working_paper          |
| *Others* | generic                 |


## Development

The following command will:

1.  Compile the grammar.
2.  Test the grammar against the [dev.ris](./resources/dev.ris) file.
3.  Output the result to the standard output.
4.  Write the output to `out.txt`. (This file is ignored by Git.)

```
make sample
```

[ris-file-format]: https://en.wikipedia.org/wiki/RIS_(file_format)