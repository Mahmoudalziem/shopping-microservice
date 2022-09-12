pipeline{
    agent any
    environment{
        NAME="Mahmoud Abd Alziem"
        SCANNER_HOME=tool 'sonarQube'
        ORGANIZATION="microservices"
        PROJECT_NAME="users"
        DOCKERIZE_VERSION="v0.6.1"
        DB_HOST=shopping.cy2ccq4ewkl3.us-east-2.rds.amazonaws.com
        DB_USER="admin"
        DB_NAME="shopping"
        REDIS_PORT="6379"
        REDIS_HOST="shopping.5vg0uf.ng.0001.use2.cache.amazonaws.com"
        KAFKA_ID="test"
        KAFKA_BROKERS="b-1.shopping.5mbhz8.c6.kafka.us-east-2.amazonaws.com:9094,b-2.shopping.5mbhz8.c6.kafka.us-east-2.amazonaws.com:9094"
        KAFKA_SSL_STATUS="1"
        TOKEN_KEY="azima"
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
                    docker build --network host -t azima/users .
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
                        docker push azima/users
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
                    ./kubectl apply -f k8s/
                    echo done
                '''
            }
        }
    }

    post{
        always{
            echo "Start Stages Pipeline"
        }
        success{
            slackSend color: "#fff", message: "Success Publish Users Service"
        }
        failure{
            slackSend color: "#000", message: "Failed Publish Users Service"
        }
    }
}