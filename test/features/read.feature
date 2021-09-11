@browser
Feature: Reading RIS

Rule: References may or may not be grouped together

  Example: References are grouped together
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

  Example: References are not grouped together
    When I parse this content
      """
      TY  - JOUR
      TI  - ref3
      ER  - 

      TY  - JOUR
      TI  - ref4
      ER  - 
      """
    Then I get this result
      """
      [ {"TY": ["JOUR"], "TI": ["ref3"]}
      , {"TY": ["JOUR"], "TI": ["ref4"]}]
      """

Rule: Accept any tags as long as they are correctly formatted

  Example: Accept known tags
    When I parse this content
      """
      TY  - JOUR
      TI  - ref1
      KW  - key1
      ER  - 
      """
    Then I get this result
      """
      [{"TY": ["JOUR"], "TI": ["ref1"], "KW": ["key1"]}]
      """

  Example: Accept unknown tags
    When I parse this content
      """
      TY  - WHATEVER
      XX  - whatever1
      ZZ  - whatever2
      ER  - 
      """
    Then I get this result
      """
      [{"TY": ["WHATEVER"], "XX": ["whatever1"], "ZZ": ["whatever2"]}]
      """
