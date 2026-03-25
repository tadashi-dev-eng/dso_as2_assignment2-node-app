pipeline {
agent any
tools {
nodejs 'NodeJS'
}
stages {
// Stage 1: Checkout Code
stage('Checkout') {
steps {
git branch: 'main',
Url:
'https://github.com/tadashi-dev-eng/dso_as2_assignment2-node-app'
}
}
// Stage 2: Install Dependenciesstage('Install') {
steps {
sh 'npm install'
}
}
// Stage 3: Build (if applicable, e.g., for React/TypeScript)
stage('Build') {
steps {
sh 'npm run build'
}
}
// Stage 4: Run Unit Tests
stage('Test') {
steps {
sh 'npm test' // Runs "test" script (Jest/Mocha)
}
post {
always {
junit 'junit.xml' // Publish test results
}
}
}
// Stage 5: Deploy (Docker Example)
stage('Deploy') {
steps {
script {
// Build Docker image
docker.build('your-dockerhub-username/node-app:latest')
// Push to Docker Hub (requires credentials)
docker.withRegistry('https://registry.hub.docker.com',
'docker-hub-creds') {
docker.image('your-docker
hub-username/node-app:latest').push()
}
}
}
}
}
}