pipeline {
    agent any
    stages {
        stage('checkout') {
            steps{
                checkout scm
            }
        }
        stage("Test"){
            steps{
                echo "Test"
            }

        }
        stage("docker compose build"){
            steps{
                sh "docker componse up"
            }
        }

    }
}
