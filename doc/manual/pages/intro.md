## Reading RIS

!!! attention

    Please make sure that the content is correctly formatted as per the RIS specification.

The `read` function takes a string and returns an array of objects (one per reference).

Each key in an object is named after the corresponding RIS tag and holds the values
for each entry for that tag in a single reference. (Some tags can appear multiple times.)

```javascript
const {read} = require('@customcommander/ris');

read(`
TY  - JOUR
TI  - Foo
KW  - keyword1
KW  - keyword2
KW  - keyword3
ER  - 

TY  - BOOK
TI  - Bar
ER  - 

TY  - CHAP
TI  - Baz
ER  - 

`);

//=> [ { "TY": [ "JOUR" ]
//=>   , "TI": [ "Foo" ]
//=>   , "KW": [ "keyword1", "keyword2", "keyword3" ] }
//=> 
//=> , { "TY": [ "BOOK" ]
//=>   , "TI": [ "Bar" ] }
//=> 
//=> , { "TY": [ "CHAP" ]
//=>   , "TI": [ "Baz" ] } ]
```

The function returns `null` if it cannot parse the content. If you think this is a bug please [raise an issue](https://github.com/customcommander/ris/issues/new).

### Additional Processing

Some tags like `DA` or `RP` have special formatting rules:

| Tag | Content (example)       | After processing                                                              |
|:----|:------------------------|:------------------------------------------------------------------------------|
| DA  | 2020/06/25/             | {"year": "2020", "month": "06", "day": "25", "info": ""}                      |
| DA  | ///                     | {"year": ""    , "month": ""  , "day": ""  , "info": ""}                      |
| DA  | /06//                   | {"year": ""    , "month": "06", "day": ""  , "info": ""}                      |
| DA  | 2020//25/Conf           | {"year": "2020", "month": ""  , "day": "25", "info": "Conf"}                  |
| RP  | IN FILE                 | {"status": "IN FILE"}                                                         |
| RP  | NOT IN FILE             | {"status": "NOT IN FILE"}                                                     |
| RP  | ON REQUEST (06/26/2020) | {"status": "ON REQUEST","date": {"year": "2020", "month": "06", "day": "26"}} |

!!! info

    The parser won't enforce these rules. Any content that doesn't comply is returned as is.

## Writing RIS

The library exposes a `write` function that takes an input of the same type than the output of the `read` function.

```javascript
const {write} = require('@customcommander/ris');

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
//         ^^^^ ^^ ^^ ^^^^
//         A    B  C  D
// A: year
// B: month
// C: day
// D: info

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

This is the only **reserved** tag. You shouldn't use it but if you do any value will be **ignored**.
