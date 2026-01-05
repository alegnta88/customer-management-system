PART 2 ANSWERS

1. The Dockerfile is done and built successfully

2. In GitHub actions and Jenkins (both are CI CD tools) every stage has its own functions. let me expplain each and every stage

BUILD: On this stage the Pipeline bulids the docker image of the source code using the Dockerfile.
ANALYZE: On this stage the code passes some testing stages for vulnerbility test and code level testing Using trivy or other devsecops tools
PACKAGE: Add system packages like maven, npm or yarn based on the code type
DEPLOY: On this stage the docker container will be running on the live server on the host


QUESTION 2

2.1 htop </br>
2.2 grep Exception | /var/log/app/sys.log </br>
2.3 sudo pkill -f legacy-app
2.4 //
2.5 find /var/log/app -type f -mtime +30

QUESTION 3
//


QUESTION 4

1. Troubleshootig steps for slow database:
- On the code level the response should be minimized. only important responses should be returned from the database
- applying pagination so that we don't have to respond all the customers list at once
- Scaling up the database using methods like database replicationm, sharding and caching frequently accessed data

2. 


3. Scaling:

Pagination is a concept that makes our application faster by returning only a limited amount of users at a time so that Our application can fetch data from the database page by page rather than fetching all at once.

- we can modify our api to respond only for example 20 users at a time by assigning on our controller so that we can take the last response to mark our next page