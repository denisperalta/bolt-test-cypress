const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://seubarriga.wcaquino.me/",
    viewportWidth: 1280,
    viewportHeight: 1024,
  },
  video: true,
  trashAssetsBeforeRuns: true,
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "reporter-config.json",
  },
});
