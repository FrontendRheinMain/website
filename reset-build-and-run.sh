#!/usr/bin/env bash
SERVER_NAME="ferm-server"
DB_NAME="mongo"

docker-compose kill

cd ./app/

echo "Killing existing $SERVER_NAME container"
docker-compose rm -f
docker rm $SERVER_NAME
docker rm $DB_NAME

#docker rmi $(docker images | grep $SERVER_NAME | tr -s ' ' | cut -d ' ' -f 3)
#docker rmi $(docker images | grep $DB_NAME | tr -s ' ' | cut -d ' ' -f 3)

echo "Rebuild the client"
npm run build:client

docker-compose up --build