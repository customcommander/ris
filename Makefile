test: /tmp/ris.test
burrito-test: /tmp/ris.burrito-test
sample: src/grammar.js resources/dev.ris
	cat resources/dev.ris | yarn -s nearley-test -q src/grammar.js | tee out.txt

parse: src/grammar.js
	node -p -e 'const fs = require("fs"); const parse = require("./index.js"); console.log(parse(fs.readFileSync("./resources/dev.ris","utf-8")));'

src/grammar.js: src/grammar.ne src/lexer.js
	yarn -s nearleyc $< > $@

resources/fields-map.csv: resources/fields-map.jq src/fields-map.json
	jq -M -S -r -f $^ > $@

resources/fields.csv: resources/fields.jq resources/fields.json
	jq -M -r -f $^ > $@

resources/full.ris: resources/full.jq  src/fields-map.json
	jq -M -r -f $^ > $@

resources/types.csv: resources/types.jq src/type-map.json
	jq -M -r -f $^ > $@

/tmp/ris.test: src/grammar.js index.js test/ris-parser.feature test/steps.js
	yarn cucumber-js --require test/steps.js test/ris-parser.feature
	touch $@

/tmp/ris.burrito-test: /tmp/ris.tgz test/burrito.test.js
	rm -rf /tmp/burrito
	mkdir /tmp/burrito
	cp test/burrito.test.js /tmp/burrito
	cd /tmp/burrito && yarn init -y && yarn add file:/tmp/ris.tgz && yarn install && node burrito.test.js
	touch $@

/tmp/ris.tgz: index.js src/grammar.js src/parser.js src/fields-map.json src/type-map.json package.json
	yarn cache clean
	yarn pack --force --filename $@
