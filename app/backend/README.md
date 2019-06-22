# Dockerize API
1) docker build -t finalgg .
2) docker run -d -p 4000:4000 finalgg

### Useful Commands
1) docker image ls (see images)
2) docker ps (see running container)
3) docker container stop <container id> (stop container)

# Swarm Mode
1) docker swarm init --advertise-addr <ip>
2) docker stack deploy -c docker-compose.yml finalgg-swarm
  
### Useful Commands
1) docker stack remove finalgg-swarm
2) docker swarm leave --force
3) docker swarm join --token xxx
