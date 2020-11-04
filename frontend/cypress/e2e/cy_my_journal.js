/* eslint-disable jest/expect-expect */
describe('My Journal', () => {
  it("should display User's journal entries", () => {
    cy.exec('npm run seed');
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.request('POST', 'http://localhost:4000/api/login', {
      email: 'nik@email.com',
      password: 'pass',
    }).then((response) => {
      window.localStorage.setItem('token', response.body.token);
    });
    cy.visit('/myjournal');
    cy.findByText('title1').should('have.text', 'title1');
    cy.findByText('title2').should('have.text', 'title2');
  });
});
