## Run RabbitMQ

```bash
# Run with docker
docker run -d --hostname my-rabbit --name rabbitmq3 -p 15672:15672 -p 5672:5672 rabbitmq:3-management
docker start -i rabbitmq3

# Open
http://localhost:15672/
User: guest
Password: guest
```

## Run Locally

```bash
# duplicate the env properties file
cp .env.development .env

# install and run
npm install
npm run dev

# access
http://localhost:8080
```

### Run in Docker

```bash
# duplicate the env properties file
cp .env.development .env

# create a image and run
docker build --tag node-docker .

# build locally node_modules folder
npm install

# publish the volume in the docker server
# source is the rootdir of ./index.js entrypoint
# target is the workdir in the Dockerfile config
docker run -it  --publish 8080:8080 --name noddock --mount "type=bind,source=$(pwd),target=/usr/src" node-docker

# access
http://localhost:8080

# make changes and force refresh with F5 in the page
# do not need stop start the runner of docker

# run again if exited
docker container stop noddock or Ctrl+C to finish process
docker container start -i noddock

# in another terminal tab, enter inside the docker bash
docker exec -it noddock /bin/sh -c "ls -l src/routes"

# remove all containers and volumes
docker rm $(docker ps -a -q)
docker volume rm $(docker volume ls -q)

# indicated to use the same version of node and npm in both environments, local and remote.
```
