  (to_entries | map(.key | split(".") | last) | unique) as $all_tags
| to_entries
| group_by(.key | split(".") | first)
| map(reduce .[] as $item ({}; . + { TY: ($item.key | split(".") | first)
                                   , ($item.key | split(".") | last): $item.value
                                   }))
| sort_by(.TY)
| ([["Type", "TY"] + $all_tags]) + map([.TY, "@type"] + (. as $format | ($all_tags | map($format[.] // "N/A"))))
| map(join(","))
| join("\n")