#!/bin/bash

rm -rf app/config ;  rm -rf app/node_modules ; rm -f app/package-lock.json ;
cd app
npm install
cd ..
docker-compose -f ./docker-compose.yml up --build