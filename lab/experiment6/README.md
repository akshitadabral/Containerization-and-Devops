# Experiment 6 : Comparison of Docker Run and Docker Compose
## PART A – THEORY

---

## Objective

To understand the relationship between Docker run and Docker Compose, and to
compare their configuration syntax and use cases.

---

## Background Theory

**2.1 Docker Run (Imperative Approach)**

Docker Run is a command-line method used to create and start containers by specifying all configurations manually through flags. Each parameter such as port mapping, volumes, environment variables, and networking must be defined explicitly in the command.

This approach gives fine-grained control but becomes complex when dealing with multiple containers.

It requires explicit flags for:

- Port mapping (-p)
- Volume mounting (-v )
- Environment variables (-e)
- Network configuration (--network )
- Restart policies (--restart )
- Resource limits ( --memory , --cpus )
- Container name (--name)

Since instructions are written step-by-step, it follows an imperative approach.
**Example:**
```
docker run -d \
 --name my-nginx \
 -p 8080:80 \
 -v ./html:/usr/share/nginx/html \
 -e NGINX_HOST=localhost \
 --restart unless-stopped \
 nginx:alpine
```

**2.2 Docker Compose (Declarative Approach)**

Docker Compose defines containers using a YAML configuration file (docker-compose.yml). Instead of writing multiple commands, all configurations are described in a structured format.

Once defined, the application can be started with a single command.

This follows a declarative approach, where the desired state is described rather than step-by-step instructions.
---

## PART B – PRACTICAL TASK
### **TASK 1. Single Container Comparison**
**Step 1:** Run Nginx Using Docker Run

**Execute:**
```
docker run -d \
 --name lab-nginx \
 -p 8081:80 \
 -v $(pwd)/html:/usr/share/nginx/html \
 nginx:alpine
```
**Verify:**
```
docker ps
```
![](./images/img1.png)

**Access:**
```
http://localhost:8082
```
![](./images/img2.png)

**Stop & Remove:**
```
docker stop lab-nginx
docker rm lab-nginx
```
### Step 2: Run Same Setup Using Docker Compose

**Create : [docker-compose.yml](./docker-compose.yml)**
```
version: '3.8'
services:
 nginx:
 image: nginx:alpine
 container_name: lab-nginx
 ports:
 - "8082:80"
 volumes:
 - ./html:/usr/share/nginx/html
```
**Run:**
```
docker compose up -d
```
**Verify:**
```
docker compose ps
```
**Stop:**
```
docker compose down
```

![](./images/img3.png)

---

### **Task 2: Multi-Container Application**
**Objective:**

Deploy WordPress with MySQL using:
1. Docker Run (manual way)
2. Docker Compose (structured way)

**A. Using Docker Run**

1. **Create network**
```
docker network create wp-net
```
2. Run MySQL
```
docker run -d \
 --name mysql \
 --network wp-net \
 -e MYSQL_ROOT_PASSWORD=secret \
 -e MYSQL_DATABASE=wordpress \
 mysql:5.7
```
3. Run WordPress
```
docker run -d \
 --name wordpress \
 --network wp-net \
 -p 8082:80 \
 -e WORDPRESS_DB_HOST=mysql \
 -e WORDPRESS_DB_PASSWORD=secret \
 wordpress:latest
```
![](./images/img4.png)

4. Open
```
http://localhost:8082
```
![](./images/img5.png)

**B. Using Docker Compose**

**1. Create file**
[docker-compose1.yml](docker-compose1.yml)
```
version: '3.8'

services:
  mysql:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: wordpress
    volumes:
      - mysql_data:/var/lib/mysql

  wordpress:
    image: wordpress:latest
    ports:
      - "8083:80"
    environment:
      WORDPRESS_DB_HOST: mysql
      WORDPRESS_DB_PASSWORD: secret
    depends_on:
      - mysql

volumes:
  mysql_data:
```
**2. Run**
```
docker compose -f docker-compose1.yml up -d
```
**3. Stop**
```
docker compose -f docker-compose1.yml down
```
![](./images/img6.png)

---

## PART C – CONVERSION & BUILD-BASED TASKS
### **Task 3: Convert Docker Run to Docker Compose**

**Problem 1: Basic Web Application**

**Given Docker Run Command:**
```

docker run -d \
  --name webapp \
  -p 5000:5000 \
  -e APP_ENV=production \
  -e DEBUG=false \
  --restart unless-stopped \
  node:18-alpine
  ```
![](./images/img7.png)

**Equivalent [docker-compose2.yml](./docker-compose2.yml):**
```
version: '3.8'

services:
  webapp:
    image: node:18-alpine
    container_name: webapp2
    ports:
      - "5000:5000"
    environment:
      APP_ENV: production
      DEBUG: "false"
    restart: unless-stopped
```
**2. Run**
```
docker compose -f docker-compose2.yml up -d
```
**3. Verify**
```
docker compose -f docker-compose2.yml ps
```
![](./images/img8.png)

### Problem 2: Volume + Network Configuration
**Given Docker Run Commands:**
```
docker network create app-net
```
```
docker run -d \
 --name postgres-db2 \
 --network app-net \
 -e POSTGRES_USER=admin \
 -e POSTGRES_PASSWORD=secret \
 -v pgdata:/var/lib/postgresql/data \
 postgres:15
 ```
 ```
docker run -d \
 --name backend \
 --network app-net \
 -p 8000:8000 \
 -e DB_HOST=postgres-db \
 -e DB_USER=admin \
 -e DB_PASS=secret \
 python:3.11-slim
```
![](./images/img9.png)

**Equivalent [docker-compose3.yml](./docker-compose3.yml):**
```
services:
  postgres-db:
    image: postgres:15
    container_name: postgres-db
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - app-net

  backend:
    image: python:3.11-slim
    container_name: backend
    ports:
      - "8084:8000"   
    environment:
      DB_HOST: postgres-db
      DB_USER: admin
      DB_PASS: secret
    depends_on:
      - postgres-db
    command: python -m http.server 8000
    networks:
      - app-net

volumes:
  pgdata:

networks:
  app-net:
  ```
**2. Run**
```
docker compose -f docker-compose3.yml up -d
```
**3. Stop**
```
docker compose -f docker-compose3.yml down
```
![](./images/img10.png)

---

### Task 4: Resource Limits Conversion
**Given Docker Run Command:**
```
docker run -d \
 --name limited-app \
 -p 9000:9000 \
 --memory="256m" \
 --cpus="0.5" \
 --restart always \
 nginx:alpine
```
![](./images/img11.png)

**Equivalent [docker-compose4.yml](./docker-compose4.yml):**

```
version: '3.8'

services:
  limited-app:
    image: nginx:alpine
    container_name: limited-app
    ports:
      - "9000:9000"
    restart: always
    deploy:
      resources:
        limits:
          memory: 256M
          cpus: "0.5"
```
**2. Run**
```
docker compose -f docker-compose4.yml up -d
```
**3. Stop**
```
docker compose -f docker-compose4.yml down
```
![](./images/img12.png)

---

## PART D – USING DOCKERFILE INSTEAD OF STANDARD IMAGE
### **Task 5: Replace Standard Image with Dockerfile (Node App)**

**1. Create project folder**
```
mkdir node-docker-lab
cd node-docker-lab
```
**2. Create [app.js](./node-docker-lab/app.js)**

```

const http = require('http');

http.createServer((req, res) => {
    res.end("Docker Compose Build Lab");
}).listen(3000);
```
![](./images/img13.png)


**3. Create [Dockerfile](./node-docker-lab/Dockerfile)**
```
FROM node:18-alpine

WORKDIR /app

COPY app.js .

EXPOSE 3000

CMD ["node", "app.js"]
```
**4. Create [docker-compose.yml](./node-docker-lab/docker-compose.yml)**
```
version: '3.8'
services:
 nodeapp:
 build:
 context: .
 dockerfile: Dockerfile
 container_name: custom-node-app
 ports:
 - "3000:3000"
```


**5. Build and run**
```
docker compose up --build -d
```
![](./images/img14.png)

**6. Check output**
```
http://localhost:3000
```
![](./images/img15.png)

---

## RESULT

The experiment successfully demonstrated both approaches. 

Docker Run was effective for simple, single-container execution, while Docker Compose provided a structured and efficient method for managing multi-container applications.

---

## CONCLUSION

Docker Run is suitable for quick testing and simple deployments, but becomes complex for larger applications. Docker Compose simplifies configuration, improves readability, and enables easier management of multi-container systems, making it more suitable for development and real-world applications.