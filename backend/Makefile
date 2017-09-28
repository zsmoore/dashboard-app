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

.PHONY: debug
debug: cleandocker
	docker-compose build
	docker-compose run --rm -e DEBUG=true backend /bin/wait-for-it.sh postgres-service:5432 -- /bin/start-debug.sh 

.PHONY: cleandocker
cleandocker:
	docker-compose stop
	docker-compose rm -f
	docker images -q -f "dangling=true" | xargs -I {} docker rmi -f {}
	docker volume ls -q -f "dangling=true" | xargs -I {} docker volume rm {}
