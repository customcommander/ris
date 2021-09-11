Feature: ER

Rule: The "End of reference" tag doesn't need to be correctly formatted

  # `ER  - ` (trailing space)
  Example: End of reference tag correctly formatted
    When I parse this content
      """
      TY  - JOUR
      TI  - ref1
      ER  - 
      TY  - JOUR
      TI  - ref2
      ER  - 
      """
    Then I get this result
      """
      [ {"TY": ["JOUR"], "TI": ["ref1"]}
      , {"TY": ["JOUR"], "TI": ["ref2"]}]
      """

  # `ER  -` (no trailing space)
  Example: End of reference tag not correctly formatted
    When I parse this content
      """
      TY  - JOUR
      TI  - ref4
      ER  -
      TY  - JOUR
      TI  - ref5
      ER  -
      """
    Then I get this result
      """
      [ {"TY": ["JOUR"], "TI": ["ref4"]}
      , {"TY": ["JOUR"], "TI": ["ref5"]}]
      """
