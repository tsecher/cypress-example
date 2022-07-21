const {defineConfig} = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "<%= default_base_url %>",
    setupNodeEvents(on, config) {
      // Allow override of baseUrl in cypress.env.json.
      config.baseUrl = config.env?.baseUrl || config.baseUrl;

      return config;
    },
  },
});
