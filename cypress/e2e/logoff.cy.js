/// <reference types="Cypress" />

import { loginNavigation } from "../support/navigation";

describe("Logoff", () => {
  beforeEach("Login to valid account", () => {
    loginNavigation.correctLogin();
  });

  // FAZENDO LOGOFF DO SISTEMA
  it("Logoff", () => {
    cy.get('a[href="/logout"]').contains("Sair").click();
    cy.get('a[href="/login"]').contains("Login").should("exist");
  });
});
