/// <reference types="Cypress" />

import { loginNavigation } from "../support/navigation";

describe("List transactions", () => {
  beforeEach("Login to valid account", () => {
    loginNavigation.correctLogin();
  });

  it("Use filters", () => {
    // CRIANDO MOVIMENTAÇÕES PARA VERIFICAR
    cy.get('a[href="/movimentacao"]').contains("Criar Movimentação").click();

    const transactionDates = ["25/03/2023", "25/04/2023"];
    const paymentDate = "01/01/2024";

    for (let index = 0; index < transactionDates.length; index++) {
      cy.get('input[type="text"][name=data_transacao]').type(
        transactionDates[index]
      );
      cy.get('input[type="text"][name=data_pagamento]').type(paymentDate);
      cy.get('input[type="text"][name="descricao"]').type(
        `Descrição ${transactionDates[index]}`
      );
      cy.get('input[type="text"][name="interessado"]').type(
        `Interessado ${transactionDates[index]}`
      );
      cy.get('input[type="text"][name="valor"]').type("2000");
      cy.get('button[type="submit"]').click();
      cy.contains("Movimentação adicionada com sucesso!").should("exist");
    }

    // VERIFICANDO MOVIMENTAÇÕES CRIADAS NO EXTRATO
    cy.get('a[href="/extrato"]').contains("Resumo Mensal").click();

    for (let index = 0; index < transactionDates.length; index++) {
      const month = transactionDates[index].slice(3, 5);
      cy.get('select[name="mes"]').select(month);
      cy.get('select[name="ano"]').select("2023");
      cy.get('input[type="submit"]').contains("Buscar").click();
      cy.contains(`Descrição ${transactionDates[index]}`).should("exist");
    }
  });

  it("Delete transaction", () => {
    // CRIANDO MOVIMENTAÇÃO PARA ELIMINAR
    cy.get('a[href="/movimentacao"]').contains("Criar Movimentação").click();

    const transactionDate = "25/05/2023";
    const paymentDate = "01/01/2024";
    const deleteDescription = `Descrição para eliminar ${transactionDate}`;

    cy.get('input[type="text"][name=data_transacao]').type(transactionDate);
    cy.get('input[type="text"][name=data_pagamento]').type(paymentDate);
    cy.get('input[type="text"][name="descricao"]').type(deleteDescription);
    cy.get('input[type="text"][name="interessado"]').type(
      `Interessado para eliminar ${transactionDate}`
    );
    cy.get('input[type="text"][name="valor"]').type("2000");
    cy.get('button[type="submit"]').click();
    cy.contains("Movimentação adicionada com sucesso!").should("exist");

    // ELIMINANDO MOVIMENTAÇÃO
    cy.get('a[href="/extrato"]').contains("Resumo Mensal").click();

    const month = transactionDate.slice(3, 5);
    cy.get('select[name="mes"]').select(month);
    cy.get('select[name="ano"]').select("2023");
    cy.get('input[type="submit"]').contains("Buscar").click();

    cy.get("tbody tr")
      .contains(deleteDescription)
      .siblings()
      .children()
      .last()
      .click();

    cy.contains("Movimentação removida com sucesso!").should("exist");
  });
});
