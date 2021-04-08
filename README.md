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

See the complete [map for each type of RIS reference](./tag-map.csv).


## Reference Types

Source: https://en.wikipedia.org/wiki/RIS_(file_format)

| TY | Description |
|:---|:------------|
|ABST|Abstract|
|ADVS|Audiovisual material|
|AGGR|Aggregated Database|
|ANCIENT|Ancient Text|
|ART|Art Work|
|BILL|Bill|
|BLOG|Blog|
|BOOK|Whole book|
|CASE|Case|
|CHAP|Book chapter|
|CHART|Chart|
|CLSWK|Classical Work|
|COMP|Computer program|
|CONF|Conference proceeding|
|CPAPER|Conference paper|
|CTLG|Catalog|
|DATA|Data file|
|DBASE|Online Database|
|DICT|Dictionary|
|EBOOK|Electronic Book|
|ECHAP|Electronic Book Section|
|EDBOOK|Edited Book|
|EJOUR|Electronic Article|
|ELEC|Web Page|
|ENCYC|Encyclopedia|
|EQUA|Equation|
|FIGURE|Figure|
|GEN|Generic|
|GOVDOC|Government Document|
|GRANT|Grant|
|HEAR|Hearing|
|ICOMM|Internet Communication|
|INPR|In Press|
|JFULL|Journal (full)|
|JOUR|Journal|
|LEGAL|Legal Rule or Regulation|
|MANSCPT|Manuscript|
|MAP|Map|
|MGZN|Magazine article|
|MPCT|Motion picture|
|MULTI|Online Multimedia|
|MUSIC|Music score|
|NEWS|Newspaper|
|PAMP|Pamphlet|
|PAT|Patent|
|PCOMM|Personal communication|
|RPRT|Report|
|SER|Serial publication|
|SLIDE|Slide|
|SOUND|Sound recording|
|STAND|Standard|
|STAT|Statute|
|THES|Thesis/Dissertation|
|UNBILL|Unenacted Bill|
|UNPB|Unpublished work|
|VIDEO|Video recording|

## Development

The following command will:

1.  Compile the grammar.
2.  Test the grammar against the `sample.ris` file.
3.  Output the result to the standard output.
4.  Write the output to `out.txt`. (This file is ignored by Git.)

```
make sample
```

## example.ris

The [example.ris](./example.ris) file contains one record (reference) of every type with every field:

```
make example.ris
```
