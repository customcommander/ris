Feature: UR (URLs)

Scenario: Multiple URLs are embedded in one RIS entry
  When I parse this content
    """
    TY  - JOUR
    UR  - url1
    ER  - 
    TY  - JOUR
    UR  - url2; url3
    ER  - 
    TY  - JOUR
    UR  - url4;
    url5;
    url6;
    ER  - 
    """
  Then I get this result
    """
    [ {"TY": ["JOUR"], "UR": ["url1"]}
    , {"TY": ["JOUR"], "UR": ["url2", "url3"]}
    , {"TY": ["JOUR"], "UR": ["url4", "url5", "url6"]}]
    """
