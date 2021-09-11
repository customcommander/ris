Feature: RP (Reprint Status)

Scenario Outline: Content is formatted correctly
  When I parse this content
    """
    TY  - JOUR
    RP  - <rp>
    ER  - 
    """
  Then I get this result
    """
    [{"TY": ["JOUR"], "RP": [<value>]}]
    """

  Examples:
    | rp                       | value                                                                  |
    | IN FILE                  | {"status":"IN FILE"}                                                   |
    | NOT IN FILE              | {"status":"NOT IN FILE"}                                               |
    | ON REQUEST (06/26/2020)  | {"status":"ON REQUEST","date":{"year":"2020","month":"06","day":"26"}} |
    | foobar                   | "foobar"                                                               |

Scenario: Content is not formatted correctly
  When I parse this content
    """
    TY  - JOUR
    RP  - foobar
    ER  - 
    """
  Then I get this result
    """
    [{"TY": ["JOUR"], "RP": ["foobar"]}]
    """
