pipeline {
    agent any

    environment {
        IMAGE_NAME = "saleem030896/todapp"
        IMAGE_TAG = "${BUILD_NUMBER}"
        KUBE_DEPLOYMENT = "todapp"
        KUBE_CONTAINER = "todapp"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: ''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
                sh 'docker tag $IMAGE_NAME:$IMAGE_TAG $IMAGE_NAME:latest'
            }
        }

        stage('Docker Hub Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker push $IMAGE_NAME:$IMAGE_TAG'
                sh 'docker push $IMAGE_NAME:latest'
            }
        }

        stage('Deploy to Kubernetes') {
    steps {
        sh 'kubectl --kubeconfig=/root/.kube/config get nodes'
        sh 'kubectl --kubeconfig=/root/.kube/config set image deployment/$KUBE_DEPLOYMENT $KUBE_CONTAINER=$IMAGE_NAME:$IMAGE_TAG'
        sh 'kubectl --kubeconfig=/root/.kube/config rollout status deployment/$KUBE_DEPLOYMENT'
    }
}




    }
}