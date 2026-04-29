# Experiment 10: SonarQube - Static Code Analysis

## Objective
To perform static code analysis using SonarQube and identify bugs, vulnerabilities, and code smells in a Java application.

---

## Theory

**What is SonarQube?**

SonarQube is an open-source platform used for static code analysis, which scans source code without executing it. It detects:

- Bugs (runtime errors)
- Vulnerabilities (security risks)
- Code smells (poor coding practices)

**Why is it needed?**

Manual code review is:

- Slow
- Inconsistent
- Not scalable

**SonarQube solves this by:**

- Automatically scanning code on every build
- Providing a visual dashboard
- Enforcing Quality Gates
- Tracking technical debt

**Key Concepts**
- Bug → Code that may fail at runtime
- Vulnerability → Security issue
- Code Smell → Poor maintainability
- Quality Gate → Pass/fail condition for code quality
- Technical Debt → Time required to fix issues

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

**(i) Create Folder**

```
mkdir sonarqube-lab

cd sonarqube-lab
```
---

## Create docker-compose.yml

**HERE:**[docker-compose.yml](./sonarqube-lab/docker-compose.yml)



**(i) Start server**

```
docker-compose up -d
```
![](./images/img2.png)


**(ii) Check logs**
```
docker-compose logs -f sonarqube
```
![](./images/img3.png)

**(iii) Open browser :**
http://localhost:9000

![](./images/img4.png)


- Login and change password when asked.

---

## **2. Generate Token**
- Click profile icon (top right)
- Go to My Account: Click Security
- Enter name → scanner-token
Click Generate and **SAVE TOKEN**.

---
![](./images/img5.png)

### **3. Create Java Project**

A sample Java project was created with intentional issues:

- Division by zero (bug)
- SQL injection risk (vulnerability)
- Unused variables (code smell)
- Duplicate methods
- Null pointer risk
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

**HERE:** [pom.xml](./sample-java-app/pom.xml)

---

### **4. Run Sonar Scanner**

This step:

- Compiled code
- Scanned for issues
- Sent report to SonarQube server

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

- **Observed:**

- Bugs detected
- Vulnerabilities identified
- Code smells highlighted
- Quality Gate status (Failed/Passed)
- Technical debt estimation
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

## Observations
- SonarQube successfully detected multiple issues in the code
- Dashboard provided detailed visualization of problems
- Quality Gate failed due to detected issues
- Token-based authentication ensured secure communication
= Static analysis helped identify problems before execution

---
 
## Result

Successfully performed static code analysis using SonarQube, and identified bugs, vulnerabilities, and code smells in the Java application.