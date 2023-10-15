/// <reference types="Cypress" />

import { loginNavigation } from "../support/navigation";

describe("Login Tests", () => {
  // LOGIN COM CONTA INVALIDA
  it("Invalid account login", () => {
    loginNavigation.incorrectLogin();
  });

  // REGISTRANDO CONTA NOVA
  it("New user register", () => {
    loginNavigation.newLogin();
  });

  // LOGIN FUNCIONANDO NORMAL
  it("Successful login", () => {
    loginNavigation.correctLogin();
  });
});
