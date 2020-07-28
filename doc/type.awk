# INPUT
#   A,1
#   B,2
#
# OUTPUT
#   | TY | Description |
#   |:---|:------------|
#   | A  | 1           |
#   | B  | 2           |


BEGIN {
  print "| TY | Description |"
  print "|:---|:------------|"
}
{
  print "|" $1 "|" $2 "|"
}
