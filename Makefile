.PHONEY = help install deploy invoke terminate test json-lint eslint mocha

# pathing
ifeq ($(OS),Windows_NT)
    yarn_eslint_path := ./node_modules/.bin/eslint
    yarn_mocha_path := ./node_modules/.bin/mocha
    yarn_nodemon_path := ./node_modules/.bin/nodemon
else
    yarn_eslint_path := ./node_modules/.bin/eslint
    yarn_mocha_path := ./node_modules/.bin/mocha
    yarn_nodemon_path := ./node_modules/.bin/nodemon
endif

help: ## this help text
	@echo 'Available targets'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# env
install: | yarn_packages ## install all the things

yarn_packages: ## install yarn packages
	yarn install

# dev
command := make test || true

watch: ## watch <command='make test'>
	${yarn_nodemon_path} --exec "${command}"

# run
run: ## run the service
	@echo run. <update the Makefile>

deploy: ## deploy the service
	@echo deploy. <update the Makefile>

# test
test: | json-lint eslint mocha ## test all the things

eslint: ## eslint files
	${yarn_eslint_path} src test

json-lint: ## json-lint files
	${yarn_eslint_path} --ext .json test data

mocha: ## run mocha tests
	${yarn_mocha_path} test
