
import { defineConfig } from 'cypress';

export default defineConfig({
  expose: {
    API_URL: 'https://restful-booker.herokuapp.com',
  },

  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
  },
});
