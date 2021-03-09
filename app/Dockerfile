## Use the lts version, more supported by queue frameworks.
FROM node:lts

# linux remote folder exec
WORKDIR /usr/src/app

COPY [".", "."]

ARG NPM_TOKEN
RUN echo "//registry.npmjs.org/:_authToken="$NPM_TOKEN > .npmrc
RUN npm install
RUN rm .npmrc

# EXPOSE PORTS INSIDE DOCKER-COMPOSE.YML

RUN /bin/sh -c 'ls -alF'

ENTRYPOINT ["npm", "run", "debug"]

