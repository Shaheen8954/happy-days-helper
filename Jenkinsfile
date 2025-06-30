@Library('Shared@main') _

pipeline {
    agent any

    environment {
        DockerHubUser = 'shaheen8954'
        ProjectName = 'happy-days'
        ImageTag = "${BUILD_NUMBER}"
        GITHUB_CREDENTIALS = credentials('github-credentials')
        GIT_BRANCH = "main"
    }

    stages {
        stage('Cleanup Workspace') {
            steps {
                script {
                    cleanWs()
                }
            }
        }

        stage('Clone Repository') {
            steps {
                script {
                    clone("https://github.com/Shaheen8954/happy-days-helper.git", "main")
                }
            }
        }

        stage('Build image') {
            steps {
                script {
                    docker_build(env.DockerHubUser, env.ProjectName, env.ImageTag)
                }
            }
        }

        stage('Security Scan with Trivy') {
            steps {
                script {
                    trivy(env.DockerHubUser, env.ProjectName, env.ImageTag)
                }
            }
        }


        stage('Push Docker Images') {
            parallel {
                stage('Push to Docker Hub') {
                    steps {
                        script {
                            docker_push(env.DockerHubUser, env.ProjectName, env.ImageTag)
                        }
                    }
                }
            }
        }
    }
}
