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

Scenario Outline: DA - Date
  Given I have this RIS file
  """
  TY  - JOUR
  DA  - <date>
  ER  - 
  """
  When I parse the file
  Then I will find a reference where '<field>' is set to '<value>'

  Examples:
    | date          | field | value                                                        |
    | 2020/06/25/   | date  | {"year": "2020", "month": "06", "day": "25", "info": ""}     |
    | ///           | date  | {"year": ""    , "month": ""  , "day": ""  , "info": ""}     |
    | /06//         | date  | {"year": ""    , "month": "06", "day": ""  , "info": ""}     |
    | 2020//25/Conf | date  | {"year": "2020", "month": ""  , "day": "25", "info": "Conf"} |

Scenario Outline: Other tags
  Given I have this RIS file
    """
    TY  - JOUR
    <tag>  - <content>
    ER  - 
    """
  When I parse the file
  Then I will find a reference where '<field>' is set to '<value>'

  Examples:
    | tag | content      | field          | value       |
    | AB  | foobar       | abstract       | foobar      |
    | AD  | fulham road  | author_address | fulham road |
    | AN  | 12ABC        | acc_number     | 12ABC       |
    | AV  | 99ABC        | arch_loc       | 99ABC       |
    | PY  | 2014         | pub_year       | "2014"      |
