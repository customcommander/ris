Feature: Mendeley

Scenario Outline: RIS Types -> Mendeley Types
  When I convert this content to Mendeley
    """
    TY  - <RIS>
    TI  - Lorem ipsum
    ER  - 
    """
  Then I get this result
    """
    [{"type": "<Mendeley>", "title": "Lorem ipsum"}]
    """

  Examples:
    | RIS     | Mendeley               |
    | ABST    | generic                |
    | ADVS    | generic                |
    | AGGR    | generic                |
    | ANCIENT | generic                |
    | ART     | generic                |
    | BILL    | bill                   |
    | BLOG    | generic                |
    | BOOK    | book                   |
    | CASE    | case                   |
    | CHAP    | book_section           |
    | CHART   | generic                |
    | CLSWK   | generic                |
    | COMP    | computer_program       |
    | CONF    | conference_proceedings |
    | CPAPER  | generic                |
    | CTLG    | generic                |
    | DATA    | generic                |
    | DBASE   | generic                |
    | DICT    | generic                |
    | EBOOK   | generic                |
    | ECHAP   | generic                |
    | EDBOOK  | generic                |
    | EJOUR   | generic                |
    | ELEC    | generic                |
    | ENCYC   | encyclopedia_article   |
    | EQUA    | generic                |
    | FIGURE  | generic                |
    | GEN     | generic                |
    | GOVDOC  | generic                |
    | GRANT   | generic                |
    | HEAR    | hearing                |
    | ICOMM   | web_page               |
    | INPR    | generic                |
    | JFULL   | journal                |
    | JOUR    | journal                |
    | LEGAL   | generic                |
    | MANSCPT | generic                |
    | MAP     | generic                |
    | MGZN    | magazine_article       |
    | MPCT    | film                   |
    | MULTI   | generic                |
    | MUSIC   | generic                |
    | NEWS    | newspaper_article      |
    | PAMP    | generic                |
    | PAT     | patent                 |
    | PCOMM   | generic                |
    | RPRT    | report                 |
    | SER     | generic                |
    | SLIDE   | generic                |
    | SOUND   | generic                |
    | STAND   | generic                |
    | STAT    | statute                |
    | THES    | thesis                 |
    | UNBILL  | generic                |
    | UNPB    | working_paper          |
    | VIDEO   | generic                |

Scenario: Generic records
  When I convert this content to Mendeley
    """
    TY  - GEN
    A1  - Author1, John1
    A2  - Editor1, John1
    A3  - Author2, John2
    A4  - Author3, John3
    AB  - abstract
    AN  - pmid123
    AU  - Author0, John0
    CY  - city
    DA  - 1969/07/20
    DO  - doi123
    ET  - edition
    IS  - issue
    KW  - keyword1
    L1  - http://l1.example.com
    L4  - http://l4.example.com
    LA  - language
    LB  - label1
    N1  - notes1
    PB  - publisher
    PY  - 1666
    RN  - notes2
    SE  - chapter
    SN  - isbn123
    SP  - pages
    ST  - short_title
    T2  - source
    T3  - series
    TA  - Author4, John4
    TI  - title
    UR  - http://url.example.com
    VL  - volume
    ER  - 
    """
  Then I get this result
    """
    [{
      "type": "generic",
      "abstract": "abstract",
      "accessed": "1969-07-20",
      "authors": [
        {"last_name": "Author1", "first_name": "John1"},
        {"last_name": "Author2", "first_name": "John2"},
        {"last_name": "Author3", "first_name": "John3"},
        {"last_name": "Author0", "first_name": "John0"},
        {"last_name": "Author4", "first_name": "John4"}
      ],
      "editors": [
        {"last_name":"Editor1", "first_name": "John1"}
      ],
      "identifiers": {
        "pmid": "pmid123",
        "isbn": "isbn123",
        "doi": "doi123"
      },
      "city": "city",
      "edition": "edition",
      "issue": "issue",
      "keywords": [
        "keyword1"
      ],
      "websites": [
        "http://l1.example.com",
        "http://l4.example.com",
        "http://url.example.com"
      ],
      "language": "language",
      "tags": [
        "label1"
      ],
      "notes": "notes1\nnotes2",
      "publisher": "publisher",
      "year": 1666,
      "chapter": "chapter",
      "pages": "pages",
      "short_title": "short_title",
      "source": "source",
      "series": "series",
      "title": "title",
      "volume": "volume"
    }]
    """

Scenario: Journal records
  When I convert this content to Mendeley
    """
    TY  - JOUR
    A1  - Author1, John1
    A2  - Editor1, John1
    A3  - Author2, John2
    A4  - Author3, John3
    AB  - abstract
    AN  - pmid123
    AU  - Author0, John0
    CY  - city
    DA  - 1969/07/20
    DO  - doi123
    ET  - edition
    IS  - issue
    KW  - keyword1
    L1  - http://l1.example.com
    L4  - http://l4.example.com
    LA  - language
    LB  - label1
    N1  - notes1
    PB  - publisher
    PY  - 1666
    RN  - notes2
    SE  - chapter
    SN  - issn123
    SP  - pages
    ST  - short_title
    T2  - source
    T3  - series
    TA  - Author4, John4
    TI  - title
    UR  - http://url.example.com
    VL  - volume
    ER  - 
    """
  Then I get this result
    """
    [{
      "type": "journal",
      "abstract": "abstract",
      "accessed": "1969-07-20",
      "authors": [
        {"last_name": "Author1", "first_name": "John1"},
        {"last_name": "Author2", "first_name": "John2"},
        {"last_name": "Author3", "first_name": "John3"},
        {"last_name": "Author0", "first_name": "John0"},
        {"last_name": "Author4", "first_name": "John4"}
      ],
      "editors": [
        {"last_name":"Editor1", "first_name": "John1"}
      ],
      "identifiers": {
        "pmid": "pmid123",
        "issn": "issn123",
        "doi": "doi123"
      },
      "city": "city",
      "edition": "edition",
      "issue": "issue",
      "keywords": [
        "keyword1"
      ],
      "websites": [
        "http://l1.example.com",
        "http://l4.example.com",
        "http://url.example.com"
      ],
      "language": "language",
      "tags": [
        "label1"
      ],
      "notes": "notes1\nnotes2",
      "publisher": "publisher",
      "year": 1666,
      "chapter": "chapter",
      "pages": "pages",
      "short_title": "short_title",
      "source": "source",
      "series": "series",
      "title": "title",
      "volume": "volume"
    }]
    """

Scenario: Journal (full) records
  When I convert this content to Mendeley
    """
    TY  - JFULL
    A1  - Author1, John1
    A2  - Editor1, John1
    A3  - Author2, John2
    A4  - Author3, John3
    AB  - abstract
    AN  - pmid123
    AU  - Author0, John0
    CY  - city
    DA  - 1969/07/20
    DO  - doi123
    ET  - edition
    IS  - issue
    KW  - keyword1
    L1  - http://l1.example.com
    L4  - http://l4.example.com
    LA  - language
    LB  - label1
    N1  - notes1
    PB  - publisher
    PY  - 1666
    RN  - notes2
    SE  - chapter
    SN  - issn123
    SP  - pages
    ST  - short_title
    T2  - source
    T3  - series
    TA  - Author4, John4
    TI  - title
    UR  - http://url.example.com
    VL  - volume
    ER  - 
    """
  Then I get this result
    """
    [{
      "type": "journal",
      "abstract": "abstract",
      "accessed": "1969-07-20",
      "authors": [
        {"last_name": "Author1", "first_name": "John1"},
        {"last_name": "Author2", "first_name": "John2"},
        {"last_name": "Author3", "first_name": "John3"},
        {"last_name": "Author0", "first_name": "John0"},
        {"last_name": "Author4", "first_name": "John4"}
      ],
      "editors": [
        {"last_name":"Editor1", "first_name": "John1"}
      ],
      "identifiers": {
        "pmid": "pmid123",
        "issn": "issn123",
        "doi": "doi123"
      },
      "city": "city",
      "edition": "edition",
      "issue": "issue",
      "keywords": [
        "keyword1"
      ],
      "websites": [
        "http://l1.example.com",
        "http://l4.example.com",
        "http://url.example.com"
      ],
      "language": "language",
      "tags": [
        "label1"
      ],
      "notes": "notes1\nnotes2",
      "publisher": "publisher",
      "year": 1666,
      "chapter": "chapter",
      "pages": "pages",
      "short_title": "short_title",
      "source": "source",
      "series": "series",
      "title": "title",
      "volume": "volume"
    }]
    """

Scenario: Patent records
  When I convert this content to Mendeley
    """
    TY  - PAT
    A1  - Author1, John1
    A2  - Editor1, John1
    A3  - Author2, John2
    A4  - Author3, John3
    AB  - abstract
    AN  - pmid123
    AU  - Author0, John0
    C6  - status123
    CY  - city
    DA  - 1969/07/20
    DO  - doi123
    ET  - edition
    IS  - issue
    KW  - keyword1
    L1  - http://l1.example.com
    L4  - http://l4.example.com
    LA  - language
    LB  - label1
    M1  - number123
    N1  - notes1
    PB  - publisher
    PY  - 1666
    RN  - notes2
    SE  - chapter
    SN  - isbn123
    SP  - pages
    ST  - short_title
    T2  - source
    T3  - series
    TA  - Author4, John4
    TI  - title
    UR  - http://url.example.com
    VL  - volume
    ER  - 
    """
  Then I get this result
    """
    [{
      "type": "patent",
      "abstract": "abstract",
      "accessed": "1969-07-20",
      "authors": [
        {"last_name": "Author1", "first_name": "John1"},
        {"last_name": "Author2", "first_name": "John2"},
        {"last_name": "Author3", "first_name": "John3"},
        {"last_name": "Author0", "first_name": "John0"},
        {"last_name": "Author4", "first_name": "John4"}
      ],
      "editors": [
        {"last_name":"Editor1", "first_name": "John1"}
      ],
      "identifiers": {
        "pmid": "pmid123",
        "isbn": "isbn123",
        "doi": "doi123"
      },
      "patent_legal_status": "status123",
      "patent_application_number": "number123",
      "city": "city",
      "edition": "edition",
      "issue": "issue",
      "keywords": [
        "keyword1"
      ],
      "websites": [
        "http://l1.example.com",
        "http://l4.example.com",
        "http://url.example.com"
      ],
      "language": "language",
      "tags": [
        "label1"
      ],
      "notes": "notes1\nnotes2",
      "publisher": "publisher",
      "year": 1666,
      "chapter": "chapter",
      "pages": "pages",
      "short_title": "short_title",
      "source": "source",
      "series": "series",
      "title": "title",
      "volume": "volume"
    }]
    """

Scenario: Report records
  When I convert this content to Mendeley
    """
    TY  - RPRT
    A1  - Author1, John1
    A2  - Editor1, John1
    A3  - Author2, John2
    A4  - Author3, John3
    AB  - abstract
    AN  - pmid123
    AU  - Author0, John0
    CY  - city
    DA  - 1969/07/20
    DO  - doi123
    ET  - edition
    IS  - issue
    KW  - keyword1
    L1  - http://l1.example.com
    L4  - http://l4.example.com
    LA  - language
    LB  - label1
    N1  - notes1
    PB  - publisher
    PY  - 1666
    RN  - notes2
    SE  - chapter
    SN  - isbn123
    SP  - pages
    ST  - short_title
    T2  - source
    T3  - series
    TA  - Author4, John4
    TI  - title
    UR  - http://url.example.com
    VL  - volume
    ER  - 
    """
  Then I get this result
    """
    [{
      "type": "report",
      "abstract": "abstract",
      "accessed": "1969-07-20",
      "authors": [
        {"last_name": "Author1", "first_name": "John1"},
        {"last_name": "Author2", "first_name": "John2"},
        {"last_name": "Author3", "first_name": "John3"},
        {"last_name": "Author0", "first_name": "John0"},
        {"last_name": "Author4", "first_name": "John4"}
      ],
      "editors": [
        {"last_name":"Editor1", "first_name": "John1"}
      ],
      "identifiers": {
        "pmid": "pmid123",
        "isbn": "isbn123",
        "doi": "doi123"
      },
      "city": "city",
      "edition": "edition",
      "issue": "issue",
      "keywords": [
        "keyword1"
      ],
      "websites": [
        "http://l1.example.com",
        "http://l4.example.com",
        "http://url.example.com"
      ],
      "language": "language",
      "tags": [
        "label1"
      ],
      "notes": "notes1\nnotes2",
      "publisher": "publisher",
      "year": 1666,
      "chapter": "chapter",
      "pages": "pages",
      "short_title": "short_title",
      "source": "source",
      "series": "series",
      "title": "title",
      "series_number": "volume"
    }]
    """


# The point is to show validation does occur.
# Not sure it's worth testing all fields as this would be quite long
# and expensive to do.
@browser
Scenario Outline: Validate Mendeley documents
  When I convert this content to Mendeley
    """
    TY  - GEN
    TI  - Title is mandatory
    <key>  - <value>
    ER  - 
    """
  Then I get this result
    """
    []
    """

  Examples:
    | key | value                        |
    | PY  | this is not a number         |
    | DA  | 2004                         |
    | DA  | 2021/02/29                   |
    | ET  | no longer than 20 characters |

# From Mendeley to RIS

@browser
Scenario: Mendeley references can be exported to RIS
  When I convert this content from Mendeley
    """
    [ { "type": "journal"
      , "title": "lorem ipsum"
      , "authors": [ {"last_name": "Doe"}
                   , {"last_name": "Doe", "first_name": "Jane"}
                   ]
      , "editors": [ {"last_name": "Foo", "first_name": "Bar"}]
      , "accessed": "2021-05-09"
      , "websites": [ "https://example.com/1"
                    , "https://example.com/2"
                    , "https://example.com/3"
                    ]
      , "keywords": [ "abc"
                    , "def"
                    , "ghi"
                    ]
      , "institution": "University123"
      , "identifiers": { "doi": "doi123"
                       , "pmid": "pmid123"
                       , "arxiv": "arxiv123"
                       }
      }
    ]
    """
  Then I get this result
    """
    TY  - JOUR
    TI  - lorem ipsum
    A2  - Foo, Bar
    AN  - pmid123
    AU  - Doe
    AU  - Doe, Jane
    AU  - University123
    DA  - 2021/05/09
    DO  - doi123
    KW  - abc
    KW  - def
    KW  - ghi
    UR  - https://example.com/1
    UR  - https://example.com/2
    UR  - https://example.com/3
    ER  - 

    """

@browser
Scenario: Invalid Mendeley references are ignored
  When I convert this content from Mendeley
    """
    [ {"type": "journal", "title": "lorem ipsum", "year": "not a number"}
    , {"type": "journal", "title": "additional fields not allowed", "answer": 42}
    , {"type": "foobarx", "title": "not a valid title"}
    , {"type": "journal", "title": "this works"}]
    """
  Then I get this result
    """
    TY  - JOUR
    TI  - this works
    ER  - 

    """