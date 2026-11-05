
import { faker } from '@faker-js/faker';
import type { Booking } from '../../types/booking';

describe('Restful Booker - Reservas', () => {
  const apiUrl = Cypress.expose('API_URL') as string;

  it('Deve criar, consultar, atualizar com PUT e PATCH e excluir uma reserva', () => {
    // Gerar datas futuras
    const checkin = new Date();
    checkin.setDate(checkin.getDate() + 10);

    const checkout = new Date(checkin);
    checkout.setDate(checkout.getDate() + 3);

    // Dados iniciais da reserva
    const booking: Booking = {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      totalprice: faker.number.int({ min: 100, max: 1000 }),
      depositpaid: true,
      bookingdates: {
        checkin: checkin.toISOString().split('T')[0],
        checkout: checkout.toISOString().split('T')[0]
      },
      additionalneeds: 'Breakfast'
    };

    // Dados para atualização completa com PUT
    const updatedBooking: Booking = {
      ...booking,
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      totalprice: faker.number.int({ min: 100, max: 1000 }),
      additionalneeds: 'Airport transfer'
    };

    // 1. Autenticar
    cy.request({
      method: 'POST',
      url: `${apiUrl}/auth`,
      body: {
        username: 'admin',
        password: 'password123'
      }
    }).then((authResponse) => {
      expect(authResponse.status).to.equal(200);

      const token = authResponse.body.token;
      expect(token).to.be.a('string').and.not.be.empty;

      // 2. Criar reserva
      cy.request({
        method: 'POST',
        url: `${apiUrl}/booking`,
        body: booking
      }).then((createResponse) => {
        expect(createResponse.status).to.equal(200);

        const bookingId = createResponse.body.bookingid;
        expect(bookingId).to.be.a('number');

        // 3. Consultar reserva
        cy.request({
          method: 'GET',
          url: `${apiUrl}/booking/${bookingId}`
        }).then((getResponse) => {
          expect(getResponse.status).to.equal(200);
          expect(getResponse.body).to.deep.equal(booking);
        });

        // 4. Atualizar completamente com PUT
        cy.request({
          method: 'PUT',
          url: `${apiUrl}/booking/${bookingId}`,
          headers: {
            Cookie: `token=${token}`
          },
          body: updatedBooking
        }).then((putResponse) => {
          expect(putResponse.status).to.equal(200);
          expect(putResponse.body).to.deep.equal(updatedBooking);
        });

        // 5. Consultar e validar atualização do PUT
        cy.request({
          method: 'GET',
          url: `${apiUrl}/booking/${bookingId}`
        }).then((getAfterPutResponse) => {
          expect(getAfterPutResponse.status).to.equal(200);
          expect(getAfterPutResponse.body).to.deep.equal(updatedBooking);
        });

        // 6. Atualizar parcialmente com PATCH
        cy.request({
          method: 'PATCH',
          url: `${apiUrl}/booking/${bookingId}`,
          headers: {
            Cookie: `token=${token}`
          },
          body: {
            additionalneeds: 'Breakfast and airport transfer'
          }
        }).then((patchResponse) => {
          expect(patchResponse.status).to.equal(200);
          expect(patchResponse.body.additionalneeds)
            .to.equal('Breakfast and airport transfer');
        });

        // 7. Consultar e validar atualização do PATCH
        cy.request({
          method: 'GET',
          url: `${apiUrl}/booking/${bookingId}`
        }).then((finalResponse) => {
          expect(finalResponse.status).to.equal(200);
          expect(finalResponse.body.firstname).to.equal(updatedBooking.firstname);
          expect(finalResponse.body.additionalneeds)
            .to.equal('Breakfast and airport transfer');
        });

        // 8. Excluir reserva
        cy.request({
          method: 'DELETE',
          url: `${apiUrl}/booking/${bookingId}`,
          headers: {
            Cookie: `token=${token}`
          }
        }).then((deleteResponse) => {
          expect(deleteResponse.status).to.equal(201);

          // 9. Confirmar exclusão
          cy.request({
            method: 'GET',
            url: `${apiUrl}/booking/${bookingId}`,
            failOnStatusCode: false
          }).then((notFoundResponse) => {
            expect(notFoundResponse.status).to.equal(404);
          });
        });
      });
    });
  });

  it('Não deve permitir excluir uma reserva sem autenticação', () => {
    const booking: Booking = {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      totalprice: 250,
      depositpaid: true,
      bookingdates: {
        checkin: '2027-01-10',
        checkout: '2027-01-15'
      },
      additionalneeds: 'Breakfast'
    };

    // 1. Criar reserva
    cy.request({
      method: 'POST',
      url: `${apiUrl}/booking`,
      body: booking
    }).then((createResponse) => {
      expect(createResponse.status).to.equal(200);

      const bookingId = createResponse.body.bookingid;

      // 2. Tentar excluir sem autenticação
      cy.request({
        method: 'DELETE',
        url: `${apiUrl}/booking/${bookingId}`,
        failOnStatusCode: false
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.equal(403);

        // 3. Autenticar para limpar a reserva
        cy.request({
          method: 'POST',
          url: `${apiUrl}/auth`,
          body: {
            username: 'admin',
            password: 'password123'
          }
        }).then((authResponse) => {
          expect(authResponse.status).to.equal(200);

          const token = authResponse.body.token;

          // 4. Excluir reserva com autenticação
          cy.request({
            method: 'DELETE',
            url: `${apiUrl}/booking/${bookingId}`,
            headers: {
              Cookie: `token=${token}`
            }
          }).then((cleanupResponse) => {
            expect(cleanupResponse.status).to.equal(201);
          });
        });
      });
    });
  });
});
