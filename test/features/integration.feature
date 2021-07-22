Feature: Works with real RIS files

Scenario Outline:
  When I parse the content of <sample>.ris
  Then I get the result as shown in <sample>.json

  Examples:
    | sample |
    | 01     |
