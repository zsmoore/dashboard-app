.PHONY: local
local:
	./manage.py makemigrations
	./manage.py migrate
	./manage.py runserver

.PHONY: lint
lint:
	@pylint server --load-plugins pylint_django --ignore=tests
	@pylint session --load-plugins pylint_django --ignore=tests

.PHONY: test
test:
	./manage.py test
