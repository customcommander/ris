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
  Then I will get a list of 3 references

# List taken from https://en.wikipedia.org/wiki/RIS_(file_format)
Scenario: Support all tags from the two major versions of the RIS specification
  Given I have this RIS file
    """
    TY  - GEN
    A1  - Doe, John
    A2  - Doe, Jane
    A3  - Doe, Jim
    A4  - Doe, Jack
    AB  - AB CONTENT
    AD  - AD CONTENT
    AN  - AN CONTENT
    AU  - Doe, Jasper
    AV  - AV CONTENT
    BT  - BT CONTENT
    C1  - C1 CONTENT
    C2  - C2 CONTENT
    C3  - C3 CONTENT
    C4  - C4 CONTENT
    C5  - C5 CONTENT
    C6  - C6 CONTENT
    C7  - C7 CONTENT
    C8  - C8 CONTENT
    CA  - CA CONTENT
    CN  - CN CONTENT
    CP  - CP CONTENT
    CT  - CT CONTENT
    CY  - CY CONTENT
    DA  - 2020/06/28/SuperConf
    DB  - DB CONTENT
    DO  - DO CONTENT
    DP  - DP CONTENT
    ED  - ED CONTENT
    EP  - EP CONTENT
    ET  - ET CONTENT
    ID  - ID CONTENT
    IS  - IS CONTENT
    J1  - J1 CONTENT
    J2  - J2 CONTENT
    JA  - JA CONTENT
    JF  - JF CONTENT
    JO  - JO CONTENT
    KW  - KW CONTENT
    L1  - L1 CONTENT
    L2  - L2 CONTENT
    L3  - L3 CONTENT
    L4  - L4 CONTENT
    LA  - LA CONTENT
    LB  - LB CONTENT
    LK  - LK CONTENT
    M1  - M1 CONTENT
    M2  - M2 CONTENT
    M3  - M3 CONTENT
    N1  - N1 CONTENT
    N2  - N2 CONTENT
    NV  - NV CONTENT
    OP  - OP CONTENT
    PB  - PB CONTENT
    PP  - PP CONTENT
    PY  - 2020
    RI  - RI CONTENT
    RN  - RN CONTENT
    RP  - IN FILE
    SE  - SE CONTENT
    SN  - SN CONTENT
    SP  - SP CONTENT
    ST  - ST CONTENT
    T1  - T1 CONTENT
    T2  - T2 CONTENT
    T3  - T3 CONTENT
    TA  - TA CONTENT
    TI  - TI CONTENT
    TT  - TT CONTENT
    U1  - U1 CONTENT
    U2  - U2 CONTENT
    U3  - U3 CONTENT
    U4  - U4 CONTENT
    U5  - U5 CONTENT
    UR  - http://example.com
    VL  - VL CONTENT
    VO  - VO CONTENT
    Y1  - Y1 CONTENT
    Y2  - Y2 CONTENT
    ER  - 
    """
  When I parse the file
  Then I will find a reference with TY as a key
  And I will find a reference with A1 as a key
  And I will find a reference with A2 as a key
  And I will find a reference with A3 as a key
  And I will find a reference with A4 as a key
  And I will find a reference with AB as a key
  And I will find a reference with AD as a key
  And I will find a reference with AN as a key
  And I will find a reference with AU as a key
  And I will find a reference with AV as a key
  And I will find a reference with BT as a key
  And I will find a reference with C1 as a key
  And I will find a reference with C2 as a key
  And I will find a reference with C3 as a key
  And I will find a reference with C4 as a key
  And I will find a reference with C5 as a key
  And I will find a reference with C6 as a key
  And I will find a reference with C7 as a key
  And I will find a reference with C8 as a key
  And I will find a reference with CA as a key
  And I will find a reference with CN as a key
  And I will find a reference with CP as a key
  And I will find a reference with CT as a key
  And I will find a reference with CY as a key
  And I will find a reference with DA as a key
  And I will find a reference with DB as a key
  And I will find a reference with DO as a key
  And I will find a reference with DP as a key
  And I will find a reference with ED as a key
  And I will find a reference with EP as a key
  And I will find a reference with ET as a key
  And I will find a reference with ID as a key
  And I will find a reference with IS as a key
  And I will find a reference with J1 as a key
  And I will find a reference with J2 as a key
  And I will find a reference with JA as a key
  And I will find a reference with JF as a key
  And I will find a reference with JO as a key
  And I will find a reference with KW as a key
  And I will find a reference with L1 as a key
  And I will find a reference with L2 as a key
  And I will find a reference with L3 as a key
  And I will find a reference with L4 as a key
  And I will find a reference with LA as a key
  And I will find a reference with LB as a key
  And I will find a reference with LK as a key
  And I will find a reference with M1 as a key
  And I will find a reference with M2 as a key
  And I will find a reference with M3 as a key
  And I will find a reference with N1 as a key
  And I will find a reference with N2 as a key
  And I will find a reference with NV as a key
  And I will find a reference with OP as a key
  And I will find a reference with PB as a key
  And I will find a reference with PP as a key
  And I will find a reference with PY as a key
  And I will find a reference with RI as a key
  And I will find a reference with RN as a key
  And I will find a reference with RP as a key
  And I will find a reference with SE as a key
  And I will find a reference with SN as a key
  And I will find a reference with SP as a key
  And I will find a reference with ST as a key
  And I will find a reference with T1 as a key
  And I will find a reference with T2 as a key
  And I will find a reference with T3 as a key
  And I will find a reference with TA as a key
  And I will find a reference with TI as a key
  And I will find a reference with TT as a key
  And I will find a reference with U1 as a key
  And I will find a reference with U2 as a key
  And I will find a reference with U3 as a key
  And I will find a reference with U4 as a key
  And I will find a reference with U5 as a key
  And I will find a reference with UR as a key
  And I will find a reference with VL as a key
  And I will find a reference with VO as a key
  And I will find a reference with Y1 as a key
  And I will find a reference with Y2 as a key

Scenario: URLs
  Given I have this RIS file
    """
    TY  - JOUR
    KW  - foo
    UR  - url1
    KW  - bar
    UR  - url2; url3
    KW  - baz
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
