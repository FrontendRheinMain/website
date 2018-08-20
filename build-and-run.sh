#!/usr/bin/env bash
SERVER_NAME="ferm-server"
DB_NAME="mongo"

cd ./app/

echo "Killing existing $SERVER_NAME container"
docker rm $(docker stop $(docker ps -a -q --filter ancestor=$SERVER_NAME --format="{{.ID}}"))
docker rm $(docker stop $(docker ps -a -q --filter ancestor=DB_NAME --format="{{.ID}}"))

echo "Rebuild the client"
npm run build:client

docker build -t $SERVER_NAME .

docker-compose rm -f
docker-compose pull
docker-compose up --build