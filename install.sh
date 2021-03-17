#!/bin/bash

# clean
find . -name 'node_modules' -exec rm -rfv {} \;
find . -type f -name "package-lock.json" -exec rm -fv {} \; 

# install
cd app
npm install
cd ..
docker-compose -f ./docker-compose.yml up --build
