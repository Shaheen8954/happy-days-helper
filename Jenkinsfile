@Library('Shared@main') _

pipeline {
    agent any

    environment {
        // Update the main app image name to match the deployment file
        ProjectName = 'happy-days'
        DockerHubUser = 'shaheen8954'
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
                    docker_build(
                         env.DockerHubUser,
                         env.ProjectName,
                         env.ImageTag,
                    )
                }
            }
        }

        stage('Run container') {
            steps {
                script {
                    sh "docker run -d -p 8080:8080 ${DockerHubUser}/${ProjectName}:${ImageTag}"
                }
            }
        }

        stage('Push Docker Images') {
            parallel {
                stage('Push to Docker Hub') {
                    steps {
                        script {
                            docker_push(
                                env.ProjectName,
                                 env.ImageTag,
                                 'docker-hub-credentials'
                            )
                        }
                    }
                }
            }
        }
    }
}
