# Experiment 2: 
# Docker Installation,Configuration, and Running Images

## Objective :
- Pull Docker images

- Run containers

- Manage container lifecycle

## PROCEDURE :

### Step 1: Pull Image 

```bash
docker pull nginx
```
![pull](./images/image1.png)

---
### Step 2: Run Container with Port Mapping

```bash
docker run -d -p 8080:80 nginx
```
![run](./images/image2.png)

---
### Step 3: Verify Running Containers

```bash
docker ps
```
![verify](./images/image3.png)

---
### Step 4: Stop and Remove Container

```bash
docker stop <container_id>
```
![stopping](./images/image4.png)

```bash
docker rm <container_id>
```
![removing container](./images/image5.png)

---
### Step 5: Remove Image

```bash
docker rmi nginx
```
![removing](./images/image6.png)

---
## RESULTS

Docker images were successfully pulled, containers executed, and lifecycle commands performed.