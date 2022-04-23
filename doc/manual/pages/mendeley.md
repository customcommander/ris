## RIS to Mendeley

Bibliographic records in RIS format can be converted to [Mendeley][] references:

```javascript
const {toMendeley} = require('@customcommander/ris');

toMendeley(`
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

### Conversion Table

The following table shows which RIS fields are supported by the [Mendeley Reference Manager][].

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
| *others* | TY        | type (as *generic*)                |
| *any*    | UR        | websites                           |
| *any*    | VL        | volume                             |
| RPRT     | VL        | series_number                      |

### Errors

Each Mendeley reference is validated before it is returned so `toMendeley` can return an empty array.

If the RIS content cannot be parsed `toMendeley` returns `null`.

## Mendeley to RIS

It is also possible to generate RIS records from Mendeley references: (using the above table)

```javascript
fromMendeley([{ type: 'journal'
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

### Errors

The `fromMendeley` returns null if the input is not an array or if **all** elements are not valid Mendeley references. Otherwise invalid elements are ignored.

[Mendeley]: https://mendeley.com
[Mendeley Reference Manager]: https://www.mendeley.com/reference-manager/