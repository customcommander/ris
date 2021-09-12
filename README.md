![GitHub Workflow Status](https://img.shields.io/github/workflow/status/customcommander/ris/continuous%20integration)
![npm (scoped)](https://img.shields.io/npm/v/@customcommander/ris)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@customcommander/ris?label=minified%20bundle%20size)

# RIS

Read/write bibliographic records in [RIS format][].

## Getting Started

```
npm i @customcommander/ris
```

### Node.js

```javascript
const {read} = require('@customcommander/ris');

read(`
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
RIS.read(`
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

## Reading RIS

The `read` function returns an array of objects (one per reference). Each key in an object is named after the corresponding RIS tag and holds the values for each entry for that tag. (Some tags can appear multiple times.)

The function returns `null` if it cannot parse the content.
Please check that the content is correctly formatted as per the RIS specification.
If you think this is a bug please [raise an issue](https://github.com/customcommander/ris/issues/new).

### Additional Processing

Some tags like `DA` or `RP` have special formatting rules. The parser supports them but won't enforce them meaning that any content that doesn't comply is returned as is.

| Tag | Content (example)       | After processing                                                              |
|:----|:------------------------|:------------------------------------------------------------------------------|
| DA  | 2020/06/25/             | {"year": "2020", "month": "06", "day": "25", "info": ""}                      |
| DA  | ///                     | {"year": ""    , "month": ""  , "day": ""  , "info": ""}                      |
| DA  | /06//                   | {"year": ""    , "month": "06", "day": ""  , "info": ""}                      |
| DA  | 2020//25/Conf           | {"year": "2020", "month": ""  , "day": "25", "info": "Conf"}                  |
| RP  | IN FILE                 | {"status": "IN FILE"}                                                         |
| RP  | NOT IN FILE             | {"status": "NOT IN FILE"}                                                     |
| RP  | ON REQUEST (06/26/2020) | {"status": "ON REQUEST","date": {"year": "2020", "month": "06", "day": "26"}} |

## Writing RIS

The library exposes a `write` function that takes an input of the same type than the output of the `read` function.

```javascript
write([ { "TY": ["JOUR"]
        , "TI": ["Hello World!"]}

      , { "TY": ["JOUR"]
        , "TI": ["Apollo 11"]
        , "DA": [{ "year": "1969"
                 , "month": "07"
                 , "day": "20"
                 , "info": "Moon"}]}]);
// => TY  - JOUR
// => TI  - Hello World!
// => ER  - 
// =>
// => TY  - JOUR
// => TI  - Apollo 11
// => DA  - 1969/07/20/Moon
// => ER  - 
// =>
```

If the input isn't an array an empty string is returned. Each element is validated first and skipped if not valid so it is possible to get an empty string even with a non-empty array.

Each element **must** be a key/value pairs object:

- Each key **must** be a two-letter capital word. The second letter *may* be a number.
- Each value **must** be an array of at least one non-empty string.

Some keys have additional rules.

### TY

This is the only **required** key. Must be set to an array of exactly one non-empty string e.g.,

```javascript
{ "TY": [ "JOUR" ] }
```

### DA

Must be set to an array of exactly one element which can be either a non-empty string or an object e.g.,

```javascript
{ "TY": [ "JOUR" ]
, "DA": [ "1969/07/20/Moon" ] }

// or

{ "TY": [ "JOUR" ]
, "DA": [ { "year":  "<non-empty string>" /* Required. */
          , "month": "<non-empty string>" /* Optional. */
          , "day":   "<non-empty string>" /* Optional. */
          , "info":  "<non-empty string>" /* Optional. */}]}
```

### AU, A1, A2, A3, A4 & TA

In addition to non-empty strings, arrays for these keys can also have objects e.g.,

```javascript
{ "TY": [ "JOUR" ]
, "AU": [ "Doe, John"
        , { "last_name":  "<non-empty string>" /* Required. */
          , "first_name": "<non-empty string>" /* Optional. */
          , "initials":   "<non-empty string>" /* Optional. */
          , "suffix":     "<non-empty string>" /* Optional. */}]}
```

### RP

Must be set to an array of exactly one element which can be either a non-empty string or an object e.g.,

```javascript
{ "TY": [ "JOUR" ]
, "RP": ["<non-empy string>"] }

// or

{ "TY": [ "JOUR" ]
, "RP": [{ "status": "<non-empty string>" /* Required. */
         , "year":   "<non-empty string>" /* Optional. */
         , "month":  "<non-empty string>" /* Optional. */
         , "day":    "<non-empty string>" /* Optional. */}] }
```

### ER

This is the only **reserved** tag. Any value will be **ignored**.

## Mendeley

### Generate Mendeley References From RIS

Bibliographic records in [RIS format] can be converted to Mendeley references:

```javascript
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

#### RIS Conversion Table

The following table shows which RIS fields are supported by the [Mendeley Reference Manager].

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

#### Errors

Each Mendeley reference is validated before it is returned so `toMendeley` can return an empty array.

If the RIS content cannot be parsed `toMendeley` returns `null`.

### Generate RIS From Mendeley References

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

#### Errors

The `fromMendeley` returns null if the input is not an array or if **all** elements are not valid Mendeley references. Otherwise invalid elements are ignored.

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
