pipeline{
    agent any
    environment{
        NAME="Mahmoud Abd Alziem"
        SCANNER_HOME=tool 'sonarQube'
        DOCKERIZE_VERSION="v0.6.1"
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
                    docker build --network host -t azima/products .
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
                        docker push azima/products
                        echo done
                    '''
                }
            }
        }
        stage('List pods') {
            steps{
                sh '''
                    curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.20.5/bin/linux/amd64/kubectl"
                    chmod u+x ./kubectl
                    echo done
                '''
            }
        }
        stage("Deploy Service products => K8S"){
            steps{
                catchError(message : "Failed To Doply To K8s"){
                    sh '''
                        ./kubectl apply -f k8s/deployment.yaml
                    '''
                }
            }
        }

        stage("Publish Service products => K8S"){
            steps{
                catchError(message : "Failed To Publish Sercice products"){
                    sh '''
                        ./kubectl apply -f k8s/service.yaml
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
            slackSend color: "#fff", message: "Success Publish products Service"
        }
        failure{
            slackSend color: "#000", message: "Failed Publish products Service"
        }
    }
}