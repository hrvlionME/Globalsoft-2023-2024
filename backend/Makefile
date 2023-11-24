DOCKER = docker
DOCKER_COMPOSE = docker compose

start:
	$(DOCKER_COMPOSE) up -d
.PHONY: start

stop:
	$(DOCKER_COMPOSE) down
.PHONY: stop

restart: stop start
.PHONY: restart