/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// promisified fs module 
const path = require('path'); 
const fs = require('fs-extra'); 

function getConfigurationByFile(file) { 
  const pathToConfigFile = path.resolve( 
    'cypress/config', 
    `cypress.${file}.json` 
  ); 
  console.log('local');
  return fs.readJson(pathToConfigFile); 
} 

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  // accept a configFile value or use local by default 
  const file = config.env.configFile || 'local'; 

  return getConfigurationByFile(file); 
}
