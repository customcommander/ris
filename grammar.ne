# Copyright (c) 2020 Julien Gonzalez <hello@spinjs.com>

@builtin "whitespace.ne"

RIS
    ->  RECORD:+

RECORD
    ->  RTYPE EOR
        {% ast => ast.filter(x => x !== null) %}

# reference type
RTYPE
    ->  "TY" SEP TY __
        {% ([,,[v]]) => ({key: 'type', value: v}) %}

# end of reference
EOR
    ->  "ER" SEP _
        {% () => null %}

# all possible values for a reference type
TY
    ->  "ABST"    # abstract
     |  "ADVS"    # audiovisual material
     |  "AGGR"    # aggregated database
     |  "ANCIENT" # ancient text
     |  "ART"     # artwork
     |  "BILL"    # bill
     |  "BLOG"    # blog
     |  "BOOK"    # book
     |  "CASE"    # case
     |  "CHAP"    # book section
     |  "CHART"   # chart
     |  "CLSWK"   # classical work
     |  "COMP"    # computer program
     |  "CONF"    # conference proceeding
     |  "CPAPER"  # conference paper
     |  "CTLG"    # catalog
     |  "DATA"    # dataset
     |  "DBASE"   # online database
     |  "DICT"    # dictionary
     |  "EBOOK"   # electronic book
     |  "ECHAP"   # electronic book section
     |  "EDBOOK"  # edited book
     |  "EJOUR"   # electronic article
     |  "ELEC"    # web page
     |  "ENCYC"   # encyclopedia
     |  "EQUA"    # equation
     |  "FIGURE"  # figure
     |  "GEN"     # generic
     |  "GOVDOC"  # government document
     |  "GRNT"    # grant
     |  "HEAR"    # hearing
     |  "ICOMM"   # internet communication
     |  "INPR"    # in press article
     |  "JFULL"   # full journal
     |  "JOUR"    # journal article
     |  "LEGAL"   # legal rule
     |  "MANSCPT" # manuscript
     |  "MAP"     # map
     |  "MGZN"    # magazine article
     |  "MPCT"    # film or broadcast
     |  "MULTI"   # online multimedia
     |  "MUSIC"   # music
     |  "NEWS"    # newspaper article
     |  "PAMP"    # pamphlet
     |  "PAT"     # patent
     |  "PCOMM"   # personal communication
     |  "RPRT"    # report
     |  "SER"     # serial
     |  "SLIDE"   # slide
     |  "SOUND"   # sound recording
     |  "STAND"   # standard
     |  "STAT"    # statute
     |  "THES"    # thesis
     |  "UNBILL"  # unenacted bill
     |  "UNPD"    # unpublished work
     |  "VIDEO"   # video recording

SEP
    ->  "  - "
        {% () => null %}
