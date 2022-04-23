=== "NPM"

    ```
    npm i @customcommander/ris
    ```

=== "Yarn"

    ```
    yarn add @customcommander/ris
    ```

=== "Browser"

    ```html
    <!-- The library is available under the RIS namespace -->
    <script src="./node_modules/@customcommander/ris/dist/browser.min.js"></script>
    ```

## Introduction

`@customcommander/ris` is a JavaScript library available on NPM that lets you read and write bibliographic records in the [RIS format][].

```javascript
const {read, write} = require('@customcommander/ris');

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

[RIS format]: https://en.wikipedia.org/wiki/RIS_(file_format)
