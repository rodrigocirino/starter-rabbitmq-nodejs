## Use the lts version, more supported by queue frameworks.
FROM node:lts

# ENV NODE_ENV=production
WORKDIR /usr/src/
COPY ["package.json", "./"]

# RUN rm -rf node_modules/
# RUN npm --version
RUN npm install

COPY . .

EXPOSE 8080

ENTRYPOINT ["npm", "start"]
# CMD ["npm", "run", "dev"]





# How to remove images, containers and volumes
# https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes-pt
# $ docker system prune -a
# $ docker rmi $(docker images -a -q)
# $ docker stop $(docker ps -a -q)
# $ docker rm $(docker ps -a -q)