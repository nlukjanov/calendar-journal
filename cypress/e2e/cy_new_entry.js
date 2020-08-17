/* eslint-disable jest/expect-expect */
describe('New entry', () => {
  it('should creat a new entry', () => {
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.request('POST', 'http://localhost:4000/api/login', {
      email: 'nik@mail.com',
      password: 'pass'
    }).then((response) => {
      window.localStorage.setItem('token', response.body.token);
    });

    cy.visit('/new-entry');
    cy.findByText('New Journal Entry');
    cy.findByTestId('entry-form');
    cy.findByLabelText('Title');
    cy.findByPlaceholderText(/entry title/i).type('My entry title');
    cy.findByLabelText('Entry text');
    cy.findByPlaceholderText(/Entry text/i).type('My entry text');
    cy.findByText('Create Entry').click();
    cy.location('pathname').should('eq', '/myjournal');
    cy.contains('My entry title');
    cy.contains('My entry text');
  });
});
