# Experiment 10: SonarQube - Static Code Analysis

## Objective
To perform static code analysis using SonarQube and identify bugs, vulnerabilities, and code smells in a Java application.

---
## Prerequisites
**Install Maven**
```
mvn -version
```

**If not installed:**
```
sudo apt install maven
```
![](./images/img1.png)
---
## STEPS
### **1. Start SonarQube Server**
- **Create Folder**
```

mkdir sonarqube-lab
cd sonarqube-lab
```

## Create docker-compose.yml
- [docker-compose.yml](./sonarqube-lab/docker-compose.yml)
```
version: '3.8'

services:
  sonar-db:
    image: postgres:13
    container_name: sonar-db
    environment:
      POSTGRES_USER: sonar
      POSTGRES_PASSWORD: sonar
      POSTGRES_DB: sonarqube
      POSTGRES_HOST_AUTH_METHOD: trust
    volumes:
      - sonar-db-data:/var/lib/postgresql/data
    networks:
      - sonarqube-lab

  sonarqube:
    image: sonarqube:lts-community
    container_name: sonarqube
    ports:
      - "9000:9000"
    environment:
      SONAR_JDBC_URL: jdbc:postgresql://sonar-db:5432/sonarqube
      SONAR_JDBC_USERNAME: sonar
      SONAR_JDBC_PASSWORD: sonar
    volumes:
      - sonar-data:/opt/sonarqube/data
      - sonar-extensions:/opt/sonarqube/extensions
    depends_on:
      - sonar-db
    networks:
      - sonarqube-lab

volumes:
  sonar-db-data:
  sonar-data:
  sonar-extensions:

networks:
  sonarqube-lab:
    driver: bridge
```


- **Start server**
```
docker-compose up -d
```
![](./images/img2.png)

- **Check logs**
```
docker-compose logs -f sonarqube
```
![](./images/img3.png)

- **Open browser :**
http://localhost:9000

![](./images/img4.png)


-  Login and change password when asked.

---

## **2. Generate Token**
- Click profile icon (top right)
- Go to My Account: Click Security
- Enter name → scanner-token
Click Generate and **SAVE TOKEN**.

---
![](./images/img5.png)

### **3. Create Java Project**
```
mkdir -p sample-java-app/src/main/java/com/example
cd sample-java-app
```
- **Create Java file** :
 [Calculator.java](./sample-java-app/src/main/java/com/example/Calculator.java)
```
nano src/main/java/com/example/Calculator.java
```
![](./images/img6.png)

- **Create pom.xml**
nano [pom.xml](./sample-java-app/pom.xml)

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
 http://maven.apache.org/xsd/maven-4.0.0.xsd">
 <modelVersion>4.0.0</modelVersion>

 <!-- Project identity -->

 <groupId>com.example</groupId>
 <artifactId>sample-app</artifactId>
 <version>1.0-SNAPSHOT</version>
 <properties>
 <maven.compiler.source>11</maven.compiler.source>
 <maven.compiler.target>11</maven.compiler.target>
 <!-- SonarQube connection settings -->
 <sonar.projectKey>sample-java-app</sonar.projectKey>
 <sonar.host.url>http://localhost:9000</sonar.host.url>
 <!-- Replace with your actual token (generated in Step 3) -->
 <sonar.login>YOUR_TOKEN_HERE</sonar.login>
 </properties>
 <dependencies>

 <!-- JUnit for unit tests -->

 <dependency>
 <groupId>junit</groupId>
 <artifactId>junit</artifactId>
 <version>4.13.2</version>
 <scope>test</scope>
 </dependency>
 </dependencies>
 <build>
 <plugins>
 <!-- This plugin lets us run: mvn sonar:sonar -->
 <plugin>
 <groupId>org.sonarsource.scanner.maven</groupId>
 <artifactId>sonar-maven-plugin</artifactId>
 <version>3.9.1.2184</version>
 </plugin>
 </plugins>
 </build>
</project>

```
---

### **4. Run Sonar Scanner**

- **Inside project folder:**
```
mvn sonar:sonar -Dsonar.login=YOUR_TOKEN
```
![](./images/img7.png)

---

### **5. View Results**

- **Open:**

http://localhost:9000

- **Click project: sample-java-app**
![](./images/img8.png)
![](./images/img10.png)

---

### **6. Check API**
```
curl -u YOUR_TOKEN: \
"http://localhost:9000/api/issues/search?projectKeys=sample-java-app"
```

![](./images/img9.png)

---

### **7. Stop Server**
```
docker-compose down
```
![](./images/img11.png)
---