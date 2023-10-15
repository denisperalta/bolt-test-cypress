/// <reference types="Cypress" />

import { loginNavigation } from "../support/navigation";

// CRIANDO NOVAS CONTAS COM NOMES UNICOS
const date1 = "Conta 1" + new Date().getTime();
const date2 = "Conta 2" + new Date().getTime();

describe("Accounts access", () => {
  beforeEach("Login to valid account", () => {
    loginNavigation.correctLogin();
  });

  it("Create 2 new accounts", () => {
    //COLOCAR TUDO EM UMA FUNÇÃO

    // CONTA NOVA 1
    cy.get('a[data-toggle="dropdown"]').click();
    cy.get('a[href="/addConta"]').contains("Adicionar").click();
    cy.get('input[name="nome"]').type(date1);
    cy.get('button[type="submit"]').contains("Salvar").click();
    cy.contains(`Conta adicionada com sucesso!`).should("exist");
    cy.get("td").contains(date1).should("exist");

    // CONTA NOVA 2
    cy.get('a[data-toggle="dropdown"]').click();
    cy.get('a[href="/addConta"]').contains("Adicionar").click();
    cy.get('input[name="nome"]').type(date2);
    cy.get('button[type="submit"]').contains("Salvar").click();
    cy.contains(`Conta adicionada com sucesso!`).should("exist");
    cy.get("td").contains(date2).should("exist");
  });

  it("List all accounts created", () => {
    cy.get('a[data-toggle="dropdown"]').click();
    cy.get('a[href="/contas"]').contains("Listar").click();

    cy.get("td").contains(date1).should("exist");
    cy.get("td").contains(date2).should("exist");
  });

  it("Change accounts name", () => {
    // PEGAR TODAS AS CONTAS EXISTENTES CONTA TESTE
    cy.get('a[data-toggle="dropdown"]').click();
    cy.get('a[href="/contas"]').contains("Listar").click();

    // ALTERANDO NOME PARA "ALTERADO"
    cy.get("tbody tr").each((_, index) => {
      cy.get("tbody tr").eq(index).find("a").first().click();
      cy.get('input[name="nome"]')
        .clear()
        .type(`${date1} Alterado ${index + 1}`);
      cy.get('button[type="submit"]').contains("Salvar").click();
    });
  });

  it("Create account with existing name", () => {
    // CONTA TESTE EXISTENTE
    const existingAccountName = "Conta Teste Existente";
    cy.get('a[data-toggle="dropdown"]').click();
    cy.get('a[href="/addConta"]').contains("Adicionar").click();
    cy.get('input[name="nome"]').type(existingAccountName);
    cy.get('button[type="submit"]').contains("Salvar").click();

    // TENTANDO CRIAR DE NOVO A MESMA CONTA COM MESMO NOME
    cy.get('a[data-toggle="dropdown"]').click();
    cy.get('a[href="/addConta"]').contains("Adicionar").click();
    cy.get('input[name="nome"]').type(existingAccountName);
    cy.get('button[type="submit"]').contains("Salvar").click();
    // cy.contains(`Conta adicionada com sucesso!`).should("exist");
    // cy.get("td").contains(existingAccountName).should("exist");

    cy.contains("Já existe uma conta com esse nome!").should("exist");
  });

  it("Delete account with existing transaction", () => {
    // CRIAR CONTA PARA TENTAR ELIMINAR

    const deleteAccount = "Conta para tentar eliminar " + new Date().getTime();
    cy.get('a[data-toggle="dropdown"]').click();
    cy.get('a[href="/addConta"]').contains("Adicionar").click();
    cy.get('input[name="nome"]').type(deleteAccount);
    cy.get('button[type="submit"]').contains("Salvar").click();
    cy.contains(`Conta adicionada com sucesso!`).should("exist");
    cy.get("td").contains(deleteAccount).should("exist");

    // CRIAR MOVIMENTO PARA BLOQUEAR CONTA DE SER ELIMINADA
    cy.get('a[href="/movimentacao"]').contains("Criar Movimentação").click();
    const transactionDate = "25/03/2023";
    const paymentDate = "01/01/2024";

    cy.get("select#tipo").select(0);
    cy.get('input[type="text"][name=data_transacao]').type(transactionDate);
    cy.get('input[type="text"][name=data_pagamento]').type(paymentDate);
    cy.get('input[type="text"][name="descricao"]').type(
      "Descrição para teste de eliminar"
    );
    cy.get('input[type="text"][name="interessado"]').type(
      "Interessado para teste de eliminar"
    );
    cy.get('input[type="text"][name="valor"]').type("3000");
    cy.get('select[name="conta"]').select(deleteAccount);
    cy.get('button[type="submit"]').click();
    cy.contains("Movimentação adicionada com sucesso!").should("exist");

    // TENTAR ELIMINAR A CONTA
    cy.get('a[data-toggle="dropdown"]').click();
    cy.get('a[href="/contas"]').contains("Listar").click();

    cy.get("tbody tr")
      .contains(deleteAccount)
      .siblings()
      .children()
      .last()
      .click();

    cy.contains("Conta em uso na movimentações").should("exist");
  });
});
