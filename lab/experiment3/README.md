# Experiment 3.1: 
##  Deploying NGINX Using Different Base Images and Comparing Image Layers
---
## Lab Objectives


1. Deploy NGINX using:

- Official nginx image
- Ubuntu-based image
- Alpine-based image

2. Understand Docker image layers and size differences

3. Compare performance, security, and use-cases of each approach
4. Explain real-world use of NGINX in containerized systems

### Prerequisites

1. Docker installed and running

2. Basic knowledge of:

- docker run

- Dockerfile

- Port mapping

3. Linux command basics

---

## Part 1: Deploy NGINX Using Official Image (Recommended Approach)

**Step 1**: Pull the Image
```bash
docker pull nginx:latest
```
**Step 2**: Run the Container

```bash
docker run -d --name nginx-official -p 8080:80 nginx
```

**Step 3**: Verify
```bash
curl http://localhost:8080
```
You should see the NGINX welcome page.
![](./images/image1.png)

---
## Observations

```bash
docker images nginx
```

- The container starts quickly with minimal setup
- The image is pre-configured and optimized for production use
- It internally uses a Debian-based system
- Suitable for immediate deployment without customization

![](./images/image2.png)

---


## Part 2: Custom NGINX Using Ubuntu Base Image

**Step 1**: Create [Dockerfile](./Dockerfile)

```bash
FROM ubuntu: 22.04

RUN apt-get update && \
apt-get install -y nginx && \
apt-get clean && \
rm -rf /var/lib/apt/lists/*

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Step 2**: Build Image
```bash
docker build -t nginx-ubuntu .
```
**Step 3**: Run Container
```bash
docker run -d -- name nginx-ubuntu -p 8081:80 nginx-ubuntu
```
![](./images/image3.png)
## Observations

```bash
docker images nginx-ubuntu
```
- Larger image size due to full Ubuntu OS
- More layers are created during the build process
- Provides extensive debugging tools and flexibility
- Slower to build and start compared to other images

![](./images/image4.png)

---

## Part 3: Custom NGINX Using Alpine Base Image

**Step 1**: Create [Dockerfile](./Dockerfiletwo)
```bash
FROM alpine:latest

RUN apk add -- no-cache nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Step 2**: Build Image
```bash
docker build -t nginx-alpine .
```

**Step 3**: Run Container
```bash
docker run -d -- name nginx-alpine -p 8082:80 nginx-alpine
```

## Observations
```bash
docker images nginx-alpine
```
- Very small image size
- Minimal packages included
- Faster image pull and container startup

![](./images/image5.png)

---

## Part 4: Image Size and Layer Comparison

- Compare Sizes

```bash
docker images | grep nginx
```
![](./images/image6.png)

## Inspect Layers
```bash
docker history nginx
docker history nginx-ubuntu
docker history nginx-alpine
```
## Observations:

- Ubuntu-based image has the largest size and maximum layers
- Alpine-based image has the smallest size and minimal layers
- Official NGINX image is optimized but moderately sized
- Fewer layers result in better efficiency and faster execution

![](./images/image7.png)

--- 

## Part 5: Functional Tasks Using NGINX

##  Task 1: Server [Custom HTML Page](./html/index.html)

```bash
mkdir html
echo "<h1>Hello from Docker NGINX</h1>" > html/index.html
```
Run:
```bash
docker run -d \
-p 8083:80 \
-v $(pwd)/html:/usr/share/nginx/html \
nginx
```
![](./images/image8.png)

## Task 2: Reverse Proxy (Conceptual)

### NGINX can:

- Forward traffic to backend services
- Load balance multiple containers
- Terminate SSL

### Example use cases:

- Frontend for microservices
- API gateway
- Static file server

---

## CONCLUSION
This experiment highlights the importance of selecting an appropriate base image in Docker. The official NGINX image provides a reliable and production-ready solution with minimal effort. Ubuntu-based images offer flexibility but are resource-intensive and less efficient. Alpine-based images, being lightweight and secure, are ideal for modern cloud-native applications and microservices. Therefore, the choice of base image should be based on the specific requirements of performance, security, and maintainability.


---

# Experiment 3.2: Flask Application – Docker 
[README.md](./experiment3.2/README.md)
