
describe('Sauce Demo - Validação do Checkout', () => {

  beforeEach(() => {
    // Login
    cy.visit('/');

    cy.get('[data-test="username"]')
      .type('standard_user');

    cy.get('[data-test="password"]')
      .type('secret_sauce');

    cy.get('[data-test="login-button"]')
      .click();

    // Adicionar produto
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click();

    // Acessar checkout
    cy.get('.shopping_cart_link')
      .click();

    cy.get('[data-test="checkout"]')
      .click();
  });

  it('Não deve continuar sem informar o primeiro nome', () => {
    cy.get('[data-test="lastName"]')
      .type('Bandeira');

    cy.get('[data-test="postalCode"]')
      .type('20000-000');

    cy.get('[data-test="continue"]')
      .click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'First Name is required');
  });

  it('Não deve continuar sem informar o sobrenome', () => {
    cy.get('[data-test="firstName"]')
      .type('Guilherme');

    cy.get('[data-test="postalCode"]')
      .type('20000-000');

    cy.get('[data-test="continue"]')
      .click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Last Name is required');
  });

  it('Não deve continuar sem informar o CEP', () => {
    cy.get('[data-test="firstName"]')
      .type('Guilherme');

    cy.get('[data-test="lastName"]')
      .type('Bandeira');

    cy.get('[data-test="continue"]')
      .click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Postal Code is required');
  });

});
