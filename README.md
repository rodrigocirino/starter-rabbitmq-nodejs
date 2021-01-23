## Start RabbitMQ with Docker

```bash
# Run with docker
# duplicate the env properties file
cp .env.development .env
# Crie um volume externo
mkdir -p /devops/rabbitmq/data
# Rode montando os volumes
docker run -it -p 15672:15672 -p 5672:5672 --hostname rabbithost --name rabbitmq3 --restart=always --mount "type=bind,source=$(pwd)/devops/rabbitmq/data,target=/var/lib/rabbitmq" rabbitmq:3.8-management
docker logs -f rabbitmq3
docker start -ait rabbitmq3

## Comands for rabbitmq admin
# http://blog.aeciopires.com/instalando-o-rabbitmq-via-docker/
# list
$ docker exec -it rabbitmq /bin/bash
rabbitmqadmin list exchanges
rabbitmqadmin list queues
# Adicionando um exchange com o nome ‘app1‘ e o tipo ‘direct‘ no vhost ‘/‘:
rabbitmqadmin declare exchange name=app1 type=direct durable=true --vhost=/
# Adicionando uma fila com o nome ‘logs_app1‘, durável e o tipo ‘direct‘ no vhost ‘/‘
rabbitmqadmin declare queue name=logs_app1 durable=true --vhost=/
# Adicionando um bind entre o exchange ‘app1‘ e a queue ‘logs_app1‘ com a routing_key ‘app1-logs_app1‘:
rabbitmqadmin declare binding source=app1 destination=logs_app1 routing_key=app1-logs_app1
# Definindo o nome do cluster RabbitMQ para ‘rabbit@rabbitmq-master’:
rabbitmqctl set_cluster_name rabbit@rabbitmq-master
# Exportando a configuração (lembre-se de salvar em um diretório ou volume comum ao conteiner e ao host)
rabbitmqadmin -H localhost -u guest -p SENHA export /tmp/rabbit.config
# Importando a configuração (lembre-se de montar um diretório ou volume comum ao conteiner e ao host):
rabbitmqadmin -q import /tmp/rabbit.config


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
