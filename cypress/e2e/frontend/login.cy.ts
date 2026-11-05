
describe('Sauce Demo - Autenticação', () => {

  it('Deve realizar login com sucesso', () => {
    cy.visit('/');

    cy.get('[data-test="username"]')
      .type('standard_user');

    cy.get('[data-test="password"]')
      .type('secret_sauce');

    cy.get('[data-test="login-button"]')
      .click();

    cy.url().should('include', '/inventory.html');

    cy.get('.title')
      .should('have.text', 'Products');

    cy.get('.inventory_list')
      .should('be.visible');
  });

  it('Não deve permitir login com usuário bloqueado', () => {
    cy.visit('/');

    cy.get('[data-test="username"]')
      .type('locked_out_user');

    cy.get('[data-test="password"]')
      .type('secret_sauce');

    cy.get('[data-test="login-button"]')
      .click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Sorry, this user has been locked out');
  });

});


it('Deve permitir login com usuário alternativo problem_user', () => {
  cy.visit('/');

  cy.get('[data-test="username"]')
    .type('problem_user');

  cy.get('[data-test="password"]')
    .type('secret_sauce');

  cy.get('[data-test="login-button"]')
    .click();

  // Validar acesso ao inventário
  cy.url().should('include', '/inventory.html');

  // Validar carregamento dos produtos
  cy.get('.inventory_list')
    .should('be.visible');

  cy.get('.inventory_item')
    .should('have.length', 6);
});


it('Não deve permitir login sem informar usuário', () => {
  cy.visit('/');

  cy.get('[data-test="password"]')
    .type('secret_sauce');

  cy.get('[data-test="login-button"]')
    .click();

  cy.get('[data-test="error"]')
    .should('be.visible')
    .and('contain.text', 'Username is required');
});

it('Não deve permitir login sem informar senha', () => {
  cy.visit('/');

  cy.get('[data-test="username"]')
    .type('standard_user');

  cy.get('[data-test="login-button"]')
    .click();

  cy.get('[data-test="error"]')
    .should('be.visible')
    .and('contain.text', 'Password is required');
});
