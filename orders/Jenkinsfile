pipeline{
    agent any
    environment{
        NAME="Mahmoud Abd Alziem"
        SCANNER_HOME=tool 'sonarQube'
    }
    stages{
    
        stage('SonarQube Analysis') {
            steps{
                withSonarQubeEnv(installationName: 'sonarQube',credentialsId: 'sonarQube') {
                    sh ''' 
                          $SCANNER_HOME/bin/sonar-scanner
                          echo Done
                    '''
                }
            }
        }
        
        stage('build'){
            steps{
                sh '''
                    docker build -t azima/orders:${BUILD_NUMBER} .
                    echo done
                '''
                                
            }
        }
        stage('Docker Login'){
            steps{
             catchError(message : "Failed Login To Docker Hub"){
                 withCredentials([usernamePassword(credentialsId: 'DOCKER_AUTH', passwordVariable: 'pass', usernameVariable: 'user')]) {
                    sh '''
    		        docker login -u ${user} -p ${pass}
                    echo done
                    '''
                } 
             }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
            }
        }
        stage('Push Image'){
            steps{
                catchError(message : "Failed Push Docker Image") {
                    sh '''
                        docker push azima/orders:${BUILD_NUMBER}
                        echo done
                    '''
                }
            }
        }
        stage("Deploy Service orders => K8S"){
            steps{
                catchError(message : "Failed To Doply To K8s"){
                    sh '''
                        kubectl apply -f k8s/deployment.yaml
                    '''
                }
            }
        }

        stage("Publish Service orders => K8S"){
            steps{
                catchError(message : "Failed To Publish Sercice orders"){
                    sh '''
                        kubectl apply -f k8s/service.yaml
                    '''
                }
            }
        }
    }

    post{
        always{
            echo "Start Stages Pipeline"
        }
        success{
            slackSend color: "#fff", message: "Success Publish orders Service"
        }
        failure{
            slackSend color: "#000", message: "Failed Publish orders Service"
        }
    }
}