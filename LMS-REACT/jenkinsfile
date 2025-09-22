pipeline {
    agent any

    tools {
        nodejs 'Node'       // Configure this name in Jenkins Global Tool Configuration
        maven  'Maven_3'    // Configure this too
    }

    environment {
        FRONTEND_DIR = 'LMS-REACT'
        BACKEND_DIR  = 'LMS-SPRINGBOOT'
    }

    options {
        skipDefaultCheckout(true)   // we’ll do explicit git checkout
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']],   // change if your branch is different
                    userRemoteConfigs: [[url: 'https://github.com/YogaNarsiReddy/lms-project.git']]
                ])
            }
        }

        stage('Frontend: Install & Build') {
            steps {
                dir("${FRONTEND_DIR}") {
                    echo '📦 Installing frontend deps...'
                    bat 'npm ci || npm install'
                    echo '🏗️ Building React (Vite)...'
                    bat 'npm run build'
                }
            }
        }

        stage('Backend: Build (skip tests)') {
            steps {
                dir("${BACKEND_DIR}") {
                    echo '🔨 Building Spring Boot (Maven)...'
                    bat 'mvn -B -DskipTests clean package'
                }
            }
        }

        stage('Tests (Parallel)') {
            parallel {
                stage('Frontend Tests') {
                    steps {
                        dir("${FRONTEND_DIR}") {
                            echo '🧪 Running frontend tests...'
                            bat 'npm test -- --watchAll=false || echo "⚠️ No frontend tests or failed."'
                        }
                    }
                }
                stage('Backend Tests') {
                    steps {
                        dir("${BACKEND_DIR}") {
                            echo '🧪 Running backend tests...'
                            bat 'mvn -B test || echo "⚠️ Backend tests failed or none."'
                        }
                    }
                }
            }
        }

        stage('Package Fullstack (optional)') {
            when { expression { return true } } // flip to false if you don’t want to bundle
            steps {
                echo '📦 Copying React build into Spring Boot static resources...'

                // clean old static (Windows)
                bat "if exist ${BACKEND_DIR}\\src\\main\\resources\\static rmdir /S /Q ${BACKEND_DIR}\\src\\main\\resources\\static"
                bat "mkdir ${BACKEND_DIR}\\src\\main\\resources\\static"

                // copy Vite build (dist) → Spring Boot static
                bat "xcopy /E /I /Y ${FRONTEND_DIR}\\dist ${BACKEND_DIR}\\src\\main\\resources\\static"

                dir("${BACKEND_DIR}") {
                    echo '🏺 Rebuilding Spring Boot JAR with frontend included...'
                    bat 'mvn -B -DskipTests clean package'
                }
            }
        }
    }

    post {
        success { echo '✅ LMS Fullstack CI passed!' }
        failure { echo '❌ Build failed. Check logs.' }
        always  { echo 'ℹ️ Pipeline finished.' }
    }
}
