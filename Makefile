install:
	npm ci

link:
	npm link

gendiff:
	node bin/gendiff.js

lint:
	npx eslint .

publish:
	npm publish --dry-run
