
node_modules: package.json
	@npm install

test: node_modules
	@node_modules/.bin/mocha \
		--harmony-generators \
		--require should \
		--reporter spec

.PHONY: test
