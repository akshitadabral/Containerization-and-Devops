# Experiment: Creating Ubuntu Virtual Machine using Vagrant and Installing Nginx

## Aim
To install VirtualBox and Vagrant on the host machine, create an Ubuntu virtual machine using Vagrant, install and verify the Nginx web server inside the virtual machine, observe system resource utilization in running and stopped states.

---

## System Configuration
- **Host Operating System**: Windows 
- **Virtualization Software**: VirtualBox
- **VM Management Tool**: Vagrant
- **Guest Operating System**: Ubuntu (hashicorp/bionic64)

---

## Step-by-Step Procedure

---

### Step 1: Download and Install VirtualBox 

Download VirtualBox from:  
https://www.virtualbox.org/wiki/Downloads

### Step 2: Download and Install Vagrant 

Download Vagrant from the official website:  
https://developer.hashicorp.com/vagrant/install

Install Vagrant on the host machine.

![Download Vagrant](./images/image1.png)


![](./images/image2.png)

---

### Step 3: Verify Vagrant Installation 

Open Command Prompt and execute:
```bash
vagrant --version 
```

![version check](./images/image3.png)

### Step 4: Initialize Vagrant with Ubuntu box

```bash
vagrant init hashicorp/bionic64
```
![initialize](./images/image4.png)

### Step 5: Start the Ubuntu Virtual Machine

```bash
vagrant up
```
![vagrant up](./images/image5.png)

### Step 6: Access the Virtual Machine using SSH

```bash
vagrant ssh
```
![vagrant ssh](./images/image6.png)

### Step 7: Update Package Repository

```bash
sudo apt update
```
![update](./images/image7.png)

### Step 8: Install Nginx Web Server inside VM

```bash
sudo apt install -y nginx
```
![install nginx](./images/image8.png)

Start the Nginx service

```bash
sudo systemctl start nginx

```
![start nginx](./images/image9.png)

### Step 9: Verify Nginx Installation

```bash
curl localhost
```
![verify nginx](./images/image10.png)

---

### Step 10: Observe Utilization Matrix in Running State

![Running State Matrix](./images/image11.png)

---

### Step 11: Stop the Virtual Machine

```bash
vagrant halt
```
![halt vagrant](./images/image12.png)

---

### Step 12: Observe Utilization Matrix in Stopped State 

![Stopped State Matrix](./images/image13.png)

---

### Step 13: Remove the Virtual Machine

```bash
vagrant destroy
```
![destroying vm](./images/image14.png)

---

### Verifying removal of VM

![vm destroyed](./images/image15.png)
