# location-task:

it handle packets received from assets every 3 minutes

## PreRequest

-   Install Docker
-   Install Docker Compose

## Install

-   Copy .env-example to .env and set your environment variables
-   build and up docker-compose

```
docker-compose up -d --build
```

-   to down docker-compose:

```
docker-compose down
```

## ERD:

-   https://dbdiagram.io/d/62fb773bc2d9cf52fab615b8
## to create migration:
```
cd src/migrations
typeorm migration:create create_users_table
```
## to run test:
```
npm test
```