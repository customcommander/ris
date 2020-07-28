test: /tmp/ris.test
burrito-test: /tmp/ris.burrito-test
sample: grammar.js sample.ris
	cat sample.ris | yarn -s nearley-test -q grammar.js | tee out.txt

samples/%.json: samples/%.ris
	node -p -e 'const fs = require("fs"); const parse = require("./index.js"); JSON.stringify(parse(fs.readFileSync("$^","utf-8")));' | jq --sort-keys '.' > $@

parse: grammar.js
	node -p -e 'const fs = require("fs"); const parse = require("./index.js"); console.log(parse(fs.readFileSync("./sample.ris","utf-8")));'

grammar.js: grammar.ne lexer.js
	yarn -s nearleyc $^ > $@

# Output Markdown table for all possible types
markdown-type:
	@jq -M -S -r -f doc/type.jq type-map.json | awk -F"," -f doc/type.awk

# Output Markdown table for the tag map
markdown-tag:
	@jq -M -S -r -f doc/tag.jq tag-map.json | awk -F"," -f doc/tag.awk

/tmp/ris.test: grammar.js index.js ris-parser.feature steps.js
	yarn cucumber-js --require steps.js ris-parser.feature
	touch $@

/tmp/ris.burrito-test: /tmp/ris.tgz burrito.test.js
	rm -rf /tmp/burrito
	mkdir /tmp/burrito
	cp burrito.test.js /tmp/burrito
	cp sample.ris /tmp/burrito
	cd /tmp/burrito && yarn init -y && yarn add file:/tmp/ris.tgz && yarn install && node burrito.test.js
	touch $@

/tmp/ris.tgz: index.js grammar.js package.json
	yarn cache clean
	yarn pack --force --filename $@
