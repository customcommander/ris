test: /tmp/ris.test
burrito-test: /tmp/ris.burrito-test

grammar.js: grammar.ne
	yarn -s nearleyc $^ > $@

/tmp/ris.test: grammar.js index.js ris-parser.feature steps.js
	yarn cucumber-js --require steps.js ris-parser.feature
	touch $@

/tmp/ris.burrito-test: /tmp/ris.tgz burrito.test.js
	rm -rf /tmp/burrito
	mkdir /tmp/burrito
	cp burrito.test.js /tmp/burrito
	cd /tmp/burrito && yarn init -y && yarn add /tmp/ris.tgz && yarn && node burrito.test.js
	touch $@

/tmp/ris.tgz: index.js grammar.js package.json
	yarn pack --force --filename $@
