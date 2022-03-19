#!/bin/sh

docker-compose exec dev make static_site/uat/index.html
docker-compose exec docs mkdocs build
mv doc/manual/site static_site/manual
