# RIS

A package for parsing bibliographic content in the [RIS format][ris-file-format].

[ris-file-format]: https://en.wikipedia.org/wiki/RIS_(file_format)

## Usage

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

## Development

The following command will:

1.  Compile the grammar.
2.  Test the grammar against the [dev.ris](./resources/dev.ris) file.
3.  Output the result to the standard output.
4.  Write the output to `out.txt`. (This file is ignored by Git.)

```
make sample
```
