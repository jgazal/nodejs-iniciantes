## ----- POSTGRESQL
docker run \
    --name postgres \
    -e POSTGRES_USER=jgazal \
    -e POSTGRES_PASSWORD=123456 \
    -e POSTGRES_DB=heroes \
    -p 5433:5433 \
    -d \
    postgres

    docker ps
    docker exec -it postgres /bin/bash

    docker run \
        --name adminer \
        -p 8080:8080 \
        --link postgres:postgres \
        -d \
        adminer
    
    Navegador: localhost:8080

## ----- MONGODB
docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=123456 \
    -d \
    mongo:4

docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient

Navegador: localhost:3000

docker exec -it mongodb \
    mongo --host localhost -u admin -p 123456 --authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({user: 'jgazal', pwd: '123456', roles: [{role: 'readWrite', db: 'herois'}]})"
