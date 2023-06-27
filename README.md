# pianoanalytics-api

## Docker Noes
```
# build image
docker build . -t pianoanalytics-api

# run container
docker run -p 8080:80 -d pianoanalytics-api

# Get container ID
$ docker ps

# Print app output
$ docker logs <container id>

# Enter the container
$ docker exec -it <container id> /bin/bash

# test
curl -i localhost:49777

# kill our running container
docker kill <container id>
```
