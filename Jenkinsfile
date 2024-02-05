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
                sh "sudo apt install npm"
                input "take password"
                sh "npm install"
            }

        }

    }
}
