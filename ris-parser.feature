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
    ER  - 
    """
  When I parse the file
  Then I will find a reference where '<field>' is set to '<value>'

  Examples:
    | field    | value          |
    | type     | JOUR           |
    | keyword  | ["foo", "bar"] |
