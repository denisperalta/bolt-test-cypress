/// <reference types="Cypress" />

import { loginNavigation } from "../support/navigation";

const transactionDate = "25/03/2023";
const paymentDate = "01/01/2024";

describe("New transactions", () => {
  beforeEach("Login to valid account", () => {
    loginNavigation.correctLogin();
  });

  it("Create new transaction (Income and expense)", () => {
    cy.get('a[href="/movimentacao"]').contains("Criar Movimentação").click();

    // CRIANDO PARA RECEITA E DESPESA
    // Primeira iteração é para receita, a segunda para despesa
    cy.get("select#tipo")
      .find("option")
      .each((_, index) => {
        cy.get("select#tipo").select(index);

        cy.get('input[type="text"][name=data_transacao]').type(transactionDate);
        cy.get('input[type="text"][name=data_pagamento]').type(paymentDate);
        cy.get('input[type="text"][name="descricao"]').type(
          "Descrição para teste 1"
        );
        cy.get('input[type="text"][name="interessado"]').type(
          "Interessado para teste 1"
        );

        cy.get('input[type="text"][name="valor"]').type("2000");
        cy.get('select[name="conta"]').select(0);
        cy.get('button[type="submit"]').click();
        cy.contains("Movimentação adicionada com sucesso!").should("exist");
      });
  });

  it("Create new transaction (Each account)", () => {
    cy.get('a[href="/movimentacao"]').contains("Criar Movimentação").click();

    // CRIANDO MOVIMENTAÇÃO PARA CADA UMA DAS CONTAS DISPONÍVEIS
    // PRECONDITION TER PELO MENOS UMA CONTA
    // TODO FUNÇÃO PARA CRIAR NOVA CONTA
    cy.get("select#conta")
      .find("option")
      .each((_, index) => {
        cy.get("select#conta").select(index);

        cy.get('input[type="text"][name=data_transacao]').type(transactionDate);
        cy.get('input[type="text"][name=data_pagamento]').type(paymentDate);
        cy.get('input[type="text"][name="descricao"]').type(
          "Descrição para teste 1"
        );
        cy.get('input[type="text"][name="interessado"]').type(
          "Interessado para teste 1"
        );
        cy.get('input[type="text"][name="valor"]').type("2000");
        cy.get('button[type="submit"]').click();
        cy.contains("Movimentação adicionada com sucesso!").should("exist");
      });
  });

  it("Create transaction for each situation", () => {
    cy.get('a[href="/movimentacao"]').contains("Criar Movimentação").click();

    // CRIANDO MOVIMENTAÇÃO PARA CADA SITUAÇÃO
    cy.get('input[type="radio"').each((_, index) => {
      if (index == 0) {
        cy.get('input[type="radio"').first().check();
      } else {
        cy.get('input[type="radio"').last().check();
      }

      cy.get('input[type="text"][name=data_transacao]').type(transactionDate);
      cy.get('input[type="text"][name=data_pagamento]').type(paymentDate);
      cy.get('input[type="text"][name="descricao"]').type(
        "Descrição para teste 1"
      );
      cy.get('input[type="text"][name="interessado"]').type(
        "Interessado para teste 1"
      );
      cy.get('input[type="text"][name="valor"]').type("2000");
      cy.get('button[type="submit"]').click();
      cy.contains("Movimentação adicionada com sucesso!").should("exist");
    });
  });

  it("Create transaction for 2 different months", () => {
    cy.get('a[href="/movimentacao"]').contains("Criar Movimentação").click();

    const transactionDates = ["25/03/2023", "25/04/2023"];

    // CRIANDO MOVIMENTAÇÃO PARA DOIS MESES DIFERENTES

    for (let index = 0; index < transactionDates.length; index++) {
      cy.get('input[type="text"][name=data_transacao]').type(
        transactionDates[index]
      );
      cy.get('input[type="text"][name=data_pagamento]').type(paymentDate);
      cy.get('input[type="text"][name="descricao"]').type(
        "Descrição para teste 1"
      );
      cy.get('input[type="text"][name="interessado"]').type(
        "Interessado para teste 1"
      );
      cy.get('input[type="text"][name="valor"]').type("2000");
      cy.get('button[type="submit"]').click();
      cy.contains("Movimentação adicionada com sucesso!").should("exist");
    }
  });

  it("Validate date fields", () => {
    cy.get('a[href="/movimentacao"]').contains("Criar Movimentação").click();

    // INSERINDO DATAS INVALIDAS
    // TESTE NEGATIVO
    const invalidDate1 = "251195";
    const invalidDate2 = "25/54/2023";

    cy.get('input[type="text"][name=data_transacao]').type(invalidDate1);
    cy.get('input[type="text"][name=data_pagamento]').type(invalidDate2);
    cy.get('input[type="text"][name="descricao"]').type(
      "Descrição para teste 1"
    );
    cy.get('input[type="text"][name="interessado"]').type(
      "Interessado para teste 1"
    );
    cy.get('input[type="text"][name="valor"]').type("2000");
    cy.get('button[type="submit"]').click();
    cy.contains("Data da Movimentação inválida (DD/MM/YYYY)").should("exist");
    cy.contains("Data do pagamento inválida (DD/MM/YYYY)").should("exist");
  });

  it("Validate value fields", () => {
    cy.get('a[href="/movimentacao"]').contains("Criar Movimentação").click();

    cy.get('input[type="text"][name=data_transacao]').type(transactionDate);
    cy.get('input[type="text"][name=data_pagamento]').type(paymentDate);
    cy.get('input[type="text"][name="descricao"]').type(
      "Descrição para teste 1"
    );
    cy.get('input[type="text"][name="interessado"]').type(
      "Interessado para teste 1"
    );

    // INSERINDO VALOR INVALIDO
    // TESTE NEGATIVO

    // VALOR DEVE ACEITAR VIRGULA -> BUG
    cy.get('input[type="text"][name="valor"]').type("2510,15");

    cy.get('button[type="submit"]').click();
    cy.contains("Valor deve ser um número").should("exist");
  });
});
