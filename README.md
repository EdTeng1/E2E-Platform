# E2E-Platform User Manual

## Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Setting Up the Project](#setting-up-the-project)
- [Deploying on AWS EC2](#deploying-on-aws-ec2)

## Introduction
This manual provides detailed instructions for setting up and deploying the E2E-Platform project on AWS EC2.

## Prerequisites
Before setting up the project, ensure you have the following installed:
- Node.js (v14.x or higher)
- Python (v3.8 or higher)
- AWS CLI
- Docker

## Setting Up the Project

1. **Clone the Repository**
    ```bash
    git clone https://github.com/Naihe0/E2E-Platform.git
    cd E2E-Platform
    ```

2. **Install Backend Dependencies**
    ```bash
    cd backend
    pip install -r requirements.txt
    cd ..
    ```

3. **Install Frontend Dependencies**
    ```bash
    cd frontend
    npm install
    cd ..
    ```

4. **Start the Project**
    - On Windows:
        ```bash
        ./start.bat
        ```
    - On Unix-based systems:
        ```bash
        ./start.sh
        ```

## Deploying on AWS EC2

1. **Set Up AWS CLI**
    - Configure your AWS CLI with the required credentials:
        ```bash
        aws configure
        ```

2. **Create an EC2 Instance**
    - Launch a new EC2 instance from the AWS Management Console.
    - Select an Amazon Machine Image (AMI), such as Amazon Linux 2 or Ubuntu.
    - Choose an instance type (e.g., t2.micro for testing).
    - Configure security groups to allow HTTP (port 80) and SSH (port 22) access.
    - Launch the instance and connect to it using SSH.

3. **Install Docker on the EC2 Instance**
    ```bash
    sudo apt-get update
    sudo apt-get install -y docker.io
    sudo systemctl start docker
    sudo systemctl enable docker
    ```

4. **Transfer Project Files to EC2**
    - Use SCP to transfer the project files to the EC2 instance:
        ```bash
        scp -i path/to/your-key-pair.pem -r E2E-Platform/ ec2-user@<ec2-public-dns>:/home/ec2-user/
        ```

5. **Build and Run Docker Containers**
    - SSH into the EC2 instance and navigate to the project directory:
        ```bash
        ssh -i path/to/your-key-pair.pem ec2-user@<ec2-public-dns>
        cd E2E-Platform
        ```
    - Build and run the Docker containers:
        ```bash
        sudo docker-compose up --build -d
        ```

6. **Access the Application**
    - Obtain the public DNS of the EC2 instance and access the application through your browser.

## Conclusion
By following this manual, you should be able to set up and deploy the E2E-Platform project on AWS EC2 successfully.
