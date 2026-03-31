## RUN AND MANAGE A "HELLO WORLD 

Great — this is a complete Kubernetes hands-on lab, and I’ll simplify it step-by-step so you can actually understand + do it in your terminal (not just copy commands).

🧠 First: What are you doing?

You are:

Running a web server (Apache httpd) inside Kubernetes
Accessing it
Scaling it
Breaking it 😈
Fixing it ✅

Think of it like:
👉 “Run a mini website inside Kubernetes and control it”

⚙️ Prerequisites (IMPORTANT)

Before starting, make sure:

Kubernetes is running (Minikube / Docker Desktop / Kind)
kubectl is working

Check:

kubectl get nodes
🚀 STEP-BY-STEP EXECUTION
✅ Step 1: Run a Pod (Basic Unit)
kubectl run apache-pod --image=httpd
kubectl get pods

👉 What happens:

A container with Apache starts
Pod name = apache-pod
🔍 Step 2: Inspect Pod
kubectl describe pod apache-pod

👉 Focus on:

Image → httpd
Port → 80
Events → shows if errors occur
🌐 Step 3: Access the App
kubectl port-forward pod/apache-pod 8081:80

Open browser:

http://localhost:8081

👉 Output:
“It works!” (Apache default page)

❌ Step 4: Delete Pod
kubectl delete pod apache-pod

👉 Insight:

Pod is gone forever
❌ No auto-restart
🔁 Step 5: Create Deployment (IMPORTANT)
kubectl create deployment apache --image=httpd
kubectl get deployments
kubectl get pods

👉 Difference:

Deployment manages pods
✔️ Self-healing enabled
🌍 Step 6: Expose Deployment
kubectl expose deployment apache --port=80 --type=NodePort
kubectl port-forward service/apache 8082:80

Open:

http://localhost:8082

👉 Same Apache page appears

📈 Step 7: Scale Deployment
kubectl scale deployment apache --replicas=2
kubectl get pods

👉 Now:

2 pods running same app