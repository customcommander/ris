# Some RIS fields have specific formatting rules.
# Default is to set the field value to the field name
def generate_value:
  if . == "A1" or . == "A2" or . == "A3" or . == "A4" or . == "AU" or . == "TA" then
    "\(.)Doe, \(.)John"
  elif . == "PY" then
    "1666"
  elif . == "DA" then
    "1969/07/20"
  elif . == "RP" then
    "IN FILE"
  else
    .
  end;

  .fields as $f
| .types[]
| ["TY  - \(.)"] + ($f | map("\(.)  - \(. | generate_value)")) + ["ER  - \n"]
| join("\n")