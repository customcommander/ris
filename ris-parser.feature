Feature: RIS Parser

Scenario: Returns a list of references
  Given I have this RIS file
    """
    TY  - JOUR
    ER  - 

    TY  - BOOK
    ER  - 

    TY  - CHAP
    ER  - 
    """
  When I parse the file
  Then I will get a list of references

Scenario Outline: Field mapping
  Given I have this RIS file
    """
    TY  - JOUR
    KW  - foo
    KW  - bar
    UR  - http://example.com
    ER  - 
    """
  When I parse the file
  Then I will find a reference where '<field>' is set to '<value>'

  Examples:
    | field    | value                  |
    | type     | JOUR                   |
    | keyword  | ["foo", "bar"]         |
    | url      | ["http://example.com"] |

Scenario: URLs
  Given I have this RIS file
    """
    TY  - JOUR
    KW  - foo
    UR  - url1
    UR  - url2; url3
    KW  - bar
    UR  - url4;
    url5;
    url6;
    ER  - 
    """
  When I parse the file
  Then I will find a reference where 'url' is set to
    """
    [ "url1"
    , "url2"
    , "url3"
    , "url4"
    , "url5"
    , "url6"
    ]
    """
