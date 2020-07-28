NR == 1 {
  printf "|"
  for (i=1; i<NF; i=i+1) { printf "%s|", $i }
  printf "\n"
  printf "|"
  for (i=1; i<NF; i=i+1) { printf ":--|", $i }
  printf "\n"
  next
}

{
  printf "|"
  for (i=1; i<NF; i=i+1) {
    if ($i == "N/A") {
      printf "_%s_|", $i
    } else {
      printf "%s|", $i
    }
  }
  printf "\n"
}
