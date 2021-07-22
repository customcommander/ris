# RIS

Read/write bibliographic records in [RIS format][].

## Getting Started

Whether you intend to use it on Node.js or in a browser you must grab a copy of `@customcommander/ris` e.g.,

```
npm i @customcommander/ris
```

### Node.js

```javascript
const RIS = require('@customcommander/ris');

RIS.parser(`
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
//=> [ {TY: ['JOUR'], TI: ['Foo']}
//=> , {TY: ['BOOK'], TI: ['Bar']}
//=> , {TY: ['CHAP'], TI: ['Baz']}]
```

### Browser

```html
<script src="./node_modules/@customcommander/ris/dist/browser.min.js"></script>

<script>
RIS.parser(`
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
//=> [ {TY: ['JOUR'], TI: ['Foo']}
//=> , {TY: ['BOOK'], TI: ['Bar']}
//=> , {TY: ['CHAP'], TI: ['Baz']}]
</script>
```

## How Does It Work?

The parser returns an array of objects (one per reference). Each key in an object is named after the corresponding RIS tag and holds an array containing all the entries for that tag. (Some tags can appear multiple times.)

### Additional Processing

Some tags like `DA` or `RP` have special formatting rules. The parser supports them but won't enforce them meaning that any content that doesn't comply is returned as is (i.e. as a string).

| Tag | Content (example)       | After processing                                                              |
|:----|:------------------------|:------------------------------------------------------------------------------|
| DA  | 2020/06/25/             | {"year": "2020", "month": "06", "day": "25", "info": ""}                      |
| DA  | ///                     | {"year": ""    , "month": ""  , "day": ""  , "info": ""}                      |
| DA  | /06//                   | {"year": ""    , "month": "06", "day": ""  , "info": ""}                      |
| DA  | 2020//25/Conf           | {"year": "2020", "month": ""  , "day": "25", "info": "Conf"}                  |
| RP  | IN FILE                 | {"status": "IN FILE"}                                                         |
| RP  | NOT IN FILE             | {"status": "NOT IN FILE"}                                                     |
| RP  | ON REQUEST (06/26/2020) | {"status": "ON REQUEST","date": {"year": "2020", "month": "06", "day": "26"}} |

## Mendeley

Bibliographic records in [RIS format] can be converted to Mendeley references:

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

**Warning:** not all RIS fields can be mapped to Mendeley fields. The following tables show which RIS fields are supported by the [Mendeley Reference Manager].

**Warning:** each Mendeley reference is validated before it is returned. If one field in the reference is invalid the _entire_ reference is discarded. e.g.,

In Mendeley a reference *MUST* have a title (`TI` entry in RIS) so converting this RIS record will return an empty list:

```javascript
RIS.toMendeley(`
TY  - JOUR
AU  - Armstrong, Neil
DA  - 1969/07/20
ER  - 
`);
//=> []
```

### RIS Conversation Table

Dependending on their types some entries will be mapped to different fields in Mendeley and whilst others may not be mapped at all.

| RIS Type | RIS Entry | Mendeley                           |
|:---------|:----------|:-----------------------------------|
| *any*    | A1        | authors                            |
| *any*    | A2        | editors                            |
| *any*    | A3        | authors                            |
| *any*    | A4        | authors                            |
| *any*    | AB        | abstract                           |
| *any*    | AN        | identifiers.pmid                   |
| *any*    | AU        | authors                            |
| PAT      | C6        | patent_legal_status                |
| *any*    | CY        | city                               |
| *any*    | DA        | accessed                           |
| *any*    | DO        | identifiers.doi                    |
| *any*    | ET        | edition                            |
| *any*    | IS        | issue                              |
| *any*    | KW        | keywords                           |
| *any*    | L1        | websites                           |
| *any*    | L4        | websites                           |
| *any*    | LA        | language                           |
| *any*    | LB        | tags                               |
| PAT      | M1        | patent_application_number          |
| *any*    | N1        | notes                              |
| *any*    | PB        | publisher                          |
| *any*    | PY        | year                               |
| *any*    | RN        | notes                              |
| *any*    | SE        | chapter                            |
| *any*    | SN        | identifiers.isbn                   |
| JFULL    | SN        | identifiers.issn                   |
| JOUR     | SN        | identifiers.issn                   |
| *any*    | SP        | pages                              |
| *any*    | ST        | short_title                        |
| *any*    | T2        | source                             |
| *any*    | T3        | series                             |
| *any*    | TA        | authors                            |
| *any*    | TI        | title                              |
| BILL     | TY        | type (as *bill*)                   |
| BOOK     | TY        | type (as *book*)                   |
| CASE     | TY        | type (as *case*)                   |
| CHAP     | TY        | type (as *book_section*)           |
| COMP     | TY        | type (as *computer_program*)       |
| CONF     | TY        | type (as *conference_proceedings*) |
| ENCYC    | TY        | type (as *encyclopedia_article*)   |
| GEN      | TY        | type (as *generic*)                |
| HEAR     | TY        | type (as *hearing*)                |
| ICOMM    | TY        | type (as *web_page*)               |
| JFULL    | TY        | type (as *journal*)                |
| JOUR     | TY        | type (as *journal*)                |
| MGZN     | TY        | type (as *magazine_article*)       |
| MPCT     | TY        | type (as *film*)                   |
| NEWS     | TY        | type (as *newspaper_article*)      |
| PAT      | TY        | type (as *patent*)                 |
| RPRT     | TY        | type (as *report*)                 |
| STAT     | TY        | type (as *statute*)                |
| THES     | TY        | type (as *thesis*)                 |
| UNPB     | TY        | type (as *working_paper*)          |
| *others* | TY        | generic                            |
| *any*    | UR        | websites                           |
| *any*    | VL        | volume                             |
| RPRT     | VL        | series_number                      |

### From Mendeley to RIS

It is also possible to generate RIS records from Mendeley references: (using the above table)

```javascript
RIS.fromMendeley([{ type: 'journal'
                  , title: 'Moon 69'
                  , year: 1969
                  , authors: [{last_name: 'Armstrong', first_name: 'Neil'}]
                  , identifiers: {doi: 'doi/123'}}]);

//=> TY  - JOUR
//=> TI  - Moon 69
//=> PY  - 1969
//=> AU  - Armstrong, Neil
//=> DO  - doi/123
//=> ER  - 
//=>
```

*Note: Mendeley references are validated against [this schema](https://github.com/customcommander/ris/blob/master/src/mendeley.schema.json) before they converted into RIS records so it is possible to end up with less or no records at all if the Mendeley references are not valid.*

## Development

The following command will:

1.  Compile the grammar.
2.  Test the grammar against the [dev.ris](./resources/dev.ris) file.
3.  Output the result to the standard output.
4.  Write the output to `out.txt`. (This file is ignored by Git.)

```
make sample
```

## Further Resources

1. See my interpretation of the [RIS specification][].

[RIS format]: https://en.wikipedia.org/wiki/RIS_(file_format)
[Mendeley Reference Manager]: https://www.mendeley.com/reference-manager/
[RIS specification]: https://gist.github.com/customcommander/74687e0b9a7829b98d62fbaf4b663efd
