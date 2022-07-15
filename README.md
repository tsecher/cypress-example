# INSTALLATION
* At the root of your project, create new directory (ex e2e)
```bash
mkdir e2e
cd e2e
```
* Install the cypress-example tool with npm or yarn.
```bash
yarn add {repo}
```
* Set up your project and follow the wizzard.
```bash
yarn set-up
```  

## Purpose
This project aims to provide tools to easily plug any project with cypress.
It provides several generators that allow you to generate pre-configured files
easily.
### List of goals :
For example (to be enhanced / updated) : 
- [] Generate specs and cypress.config.js without IHM.
- [x] Generate a docksal command (only available for docksal projects)
- [x] Set-up .git_ignore file ( )
- [] Provide default ci configuration files ()
- [] Provide several basic testing according to project type (Ex. Drupal basics testing). 

### Why a npm package ?
The npm package brings several advantages:
- clean version and backward compatibility
- easy to maintain
- easy to update 
- easy to share new features
- easy to use...

## How it works
This project uses `installers` for each actions you want to 