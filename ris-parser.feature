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
  Then I will find a reference where 'UR' is set to
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
  Then I will find a reference where 'DA' is set to '<value>'

  Examples:
    | date          | value                                                        |
    | 2020/06/25/   | {"year": "2020", "month": "06", "day": "25", "info": ""}     |
    | ///           | {"year": ""    , "month": ""  , "day": ""  , "info": ""}     |
    | /06//         | {"year": ""    , "month": "06", "day": ""  , "info": ""}     |
    | 2020//25/Conf | {"year": "2020", "month": ""  , "day": "25", "info": "Conf"} |

Scenario Outline: Authors
  Given I have this RIS file
    """
    TY  - JOUR
    AU  - Doe, John
    A2  - Doe, John
    A3  - Doe, John
    A4  - Doe, John
    <tag>  - <content>
    ER  - 
    """
  When I parse the file
  Then I will find a reference where '<tag>' is set to '<value>'

  Examples:
    | tag | content               | value                                                                                                                 |
    | AU  | Phillips, A.J         | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"A.J","suffix":""}]         |
    | AU  | Phillips, Albert John | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"Albert John","suffix":""}] |
    | AU  | Phillips,A.J.,Sr.     | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"A.J.","suffix":"Sr."}]     |
    | A2  | Phillips, A.J         | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"A.J","suffix":""}]         |
    | A2  | Phillips, Albert John | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"Albert John","suffix":""}] |
    | A2  | Phillips,A.J.,Sr.     | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"A.J.","suffix":"Sr."}]     |
    | A3  | Phillips, A.J         | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"A.J","suffix":""}]         |
    | A3  | Phillips, Albert John | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"Albert John","suffix":""}] |
    | A3  | Phillips,A.J.,Sr.     | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"A.J.","suffix":"Sr."}]     |
    | A4  | Phillips, A.J         | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"A.J","suffix":""}]         |
    | A4  | Phillips, Albert John | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"Albert John","suffix":""}] |
    | A4  | Phillips,A.J.,Sr.     | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"A.J.","suffix":"Sr."}]     |

Scenario Outline: Other tags
  Given I have this RIS file
    """
    TY  - JOUR
    <tag>  - <content>
    ER  - 
    """
  When I parse the file
  Then I will find a reference where '<tag>' is set to '<value>'

  Examples:
    | tag | content                  | value                                                                  |
    | AB  | foobar                   | foobar                                                                 |
    | AD  | fulham road              | fulham road                                                            |
    | AN  | 12ABC                    | 12ABC                                                                  |
    | AV  | 99ABC                    | 99ABC                                                                  |
    | BT  | BT VALUE                 | BT VALUE                                                               |
    | C1  | aa                       | aa                                                                     |
    | C2  | bb                       | bb                                                                     |
    | C3  | cc                       | cc                                                                     |
    | C4  | dd                       | dd                                                                     |
    | C5  | ee                       | ee                                                                     |
    | C6  | ff                       | ff                                                                     |
    | C7  | gg                       | gg                                                                     |
    | C8  | hh                       | hh                                                                     |
    | CA  | my caption               | my caption                                                             |
    | CN  | CALLNUM123               | CALLNUM123                                                             |
    | CP  | CP VALUE                 | CP VALUE                                                               |
    | CT  | CT VALUE                 | CT VALUE                                                               |
    | CY  | pubplace                 | pubplace                                                               |
    | DB  | mydb345                  | mydb345                                                                |
    | DP  | dbprovidedby1            | dbprovidedby1                                                          |
    | DO  | 10.1177/0003122411414817 | 10.1177/0003122411414817                                               |
    | ED  | ED VALUE                 | ED VALUE                                                               |
    | EP  | EP VALUE                 | EP VALUE                                                               |
    | ET  | 4th Ed.                  | 4th Ed.                                                                |
    | ID  | ID VALUE                 | ID VALUE                                                               |
    | IS  | IS VALUE                 | IS VALUE                                                               |
    | J2  | R2D2                     | R2D2                                                                   |
    | RP  | IN FILE                  | {"status":"IN FILE"}                                                   |
    | RP  | NOT IN FILE              | {"status":"NOT IN FILE"}                                               |
    | RP  | ON REQUEST (06/26/2020)  | {"status":"ON REQUEST","date":{"year":"2020","month":"06","day":"26"}} |
    | PY  | 2014                     | "2014"                                                                 |

Scenario: Default values
  Given I have this RIS file
    """
    TY  - JOUR
    ER  - 
    """
  When I parse the file
  Then I will find a reference where 'RP' is set to '{"status": "NOT IN FILE"}'
