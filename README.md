# INSTALLATION
* At the root of your project, create new directory testing
* From testing directory clone project :
```bash
yarn add {repo}
yarn set-up
```
* Run npx cypress open ( To open the cypress window test.)  
  
# Integration CI

By default, the config file cypress/config/cypress.local.json is used, if you want to use another file 
to switch between environments settings you need to add steps in order :

 1. For example if we need to add env variables to ppd environment, create new file in cypress/config/cypress/ and
  name it cypress.ppd.json
 2. Add new settings to your new file : 
 ```json
    {   
    "baseUrl": "http://generation2024-ppd.paris2024.org.fr",
    "env": {
            "name1": "myvalue"
     }
    }
``` 
 3. Run you test : npx cypress open --env configFile=ppd  
 4. Add user PIC-KI to your gitlab project members. this allow jenkins to pull code.
 5. Create new job jenkins from existing one cypress_example or use Jenkinsfile ( See http://ki-jenkins.dev.klee.lan.net:8080/job/cypress_example/)
 6. From pipeline script Change the url of your gitlab project and the value of configFile=dev if you want to target anothor env.
 
 # Running tests locally
 
 To run tests locally, run the following command :
```bash
 npx cypress open 
```
by default local env is used


# Update cypress
 
```bash
 npm update cypress
```
