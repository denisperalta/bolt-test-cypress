const date = new Date().getTime();

const accounts = {
  invalidAccount: { email: "test1@test.com", password: "admin123" },
  validAccount: {
    name: "Steve",
    email: "test3@test.com",
    password: "admin123",
  },
  newAccount: {
    name: "date",
    email: `${date}@test.com`,
    password: "admin123",
  },
};

export class LoginNavigation {
  correctLogin() {
    cy.visit("/", {});
    cy.get('input[type="email"]').type(accounts.validAccount.email);
    cy.get('input[type="password"]').type(accounts.validAccount.password);
    cy.get('button[type="submit"]').contains("Entrar").click();

    cy.contains(`Bem vindo, ${accounts.validAccount.name}!`).should("exist");
  }

  incorrectLogin() {
    cy.visit("/", {});
    cy.get('input[type="email"]').type(accounts.invalidAccount.email);
    cy.get('input[type="password"]').type(accounts.invalidAccount.password);
    cy.get('button[type="submit"]').contains("Entrar").click();

    cy.contains("Problemas com o login do usuário").should("exist");
  }

  newLogin() {
    cy.visit("/cadastro");
    cy.get('input[type="text"][name="nome"]').type(accounts.newAccount.name);
    cy.get('input[type="email"]').type(accounts.newAccount.email);
    cy.get('input[type="password"]').type(accounts.newAccount.password);
    cy.get('input[type="submit"]').contains("Cadastrar").click();

    cy.contains("Usuário inserido com sucesso").should("exist");
  }
}

export const loginNavigation = new LoginNavigation();
