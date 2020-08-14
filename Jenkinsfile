pipeline {
   agent {
    // this image provides everything needed to run Cypress
    docker {
      image 'cypress/base:12.18.0'
      args '-u 0:0 -e CYPRESS_VIDEO=false -e configFile=dev -e NO_COLOR=1 -v npm-cache:/root/.npm -v cypress-cache:/root/.cache'
    }
  }


   stages {
      stage('Checkout code') {
         steps {
            git branch: 'develop', 
            credentialsId: '062f8230-202d-4bfa-a12e-XXXXXXXXXXXXX', 
            url: 'https://gitlab-interne.dev.klee.lan.net/test/test.git'
         }
      }
      
      // first stage installs node dependencies and Cypress binary
      stage('build') {
       steps {
        echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
        dir('testing/e2e') {
          sh 'npm ci'
          // Use xvfb-run to fix issue error display. See https://github.com/cypress-io/cypress/issues/6184
          sh 'xvfb-run npx cypress verify'
        }
       }
      }
      
      stage('Test') {
          steps {
            dir('testing/e2e') {
              sh "xvfb-run npx cypress run -e configFile=dev --record false --spec 'cypress/integration/FO/Desktop/**'"
            }
          }
      }
    }
}