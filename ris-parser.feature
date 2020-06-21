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
  Then I get this list
    """
    [ { "type": "JOUR" }
    , { "type": "BOOK" }
    , { "type": "CHAP" }
    ]
    """
