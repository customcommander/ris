Feature: Writing RP entries

Scenario: RP as strings
  When I convert this content
    """
    [{"TY": ["JOUR"], "RP": ["IN FILE"]}]
    """
  Then I get this result
    """
    TY  - JOUR
    RP  - IN FILE
    ER  - 

    """

Scenario: RP as objects
  When I convert this content
    """
    [ {"TY": ["JOUR"], "RP": [{"status": "IN FILE"}]}
    , {"TY": ["JOUR"], "RP": [{"status": "NOT IN FILE"}]}
    , {"TY": ["JOUR"], "RP": [{"status": "ON REQUEST", "year": "1969", "month": "07", "day": "20"}]}]
    """
  Then I get this result
    """
    TY  - JOUR
    RP  - IN FILE
    ER  - 

    TY  - JOUR
    RP  - NOT IN FILE
    ER  - 

    TY  - JOUR
    RP  - ON REQUEST (07/20/1969)
    ER  - 

    """

Scenario: Invalid RP input
  When I convert this content
    """
    [ {"TY": ["JOUR"], "RP": []}
    , {"TY": ["JOUR"], "RP": [42]}
    , {"TY": ["JOUR"], "RP": [""]}
    , {"TY": ["JOUR"], "RP": ["foo", "bar"]}
    , {"TY": ["JOUR"], "RP": [{"status": 42}]}
    , {"TY": ["JOUR"], "RP": [{"status": ""}]}]
    """
  Then I get this result
    """
    """