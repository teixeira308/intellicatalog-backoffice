docker-compose stop backoffice
docker-compose rm -f backoffice
docker-compose build backoffice
docker-compose up -d backoffice
