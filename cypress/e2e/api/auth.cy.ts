
describe('Restful Booker - Autenticação', () => {

  const apiUrl = Cypress.expose('API_URL') as string;

  it('Deve autenticar com credenciais válidas', () => {

    cy.request({
      method: 'POST',
      url: `${apiUrl}/auth`,
      body: {
        username: 'admin',
        password: 'password123'
      }
    }).then((response) => {

      expect(response.status).to.equal(200);

      expect(response.body).to.have.property('token');

      expect(response.body.token).to.be.a('string');

      expect(response.body.token).not.to.be.empty;

    });

  });

});
it('Não deve autenticar com credenciais inválidas', () => {
  const apiUrl = Cypress.expose('API_URL') as string;

  cy.request({
    method: 'POST',
    url: `${apiUrl}/auth`,
    body: {
      username: 'usuario_invalido',
      password: 'senha_invalida'
    }
  }).then((response) => {
    // A API Restful Booker retorna HTTP 200,
    // mas informa que as credenciais são inválidas.
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('reason');
    expect(response.body.reason).to.equal('Bad credentials');
    expect(response.body).not.to.have.property('token');
  });
});