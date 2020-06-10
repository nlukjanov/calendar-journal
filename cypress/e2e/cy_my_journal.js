/* eslint-disable jest/expect-expect */
describe('calendar journal app', () => {
  it('should display User\'s journal entries', () => {
    cy.visit('/signin');
    cy.findByLabelText('Email');
    cy.findByLabelText('Password');
    cy.findByPlaceholderText('Email').type('nik@mail.com');
    cy.findByPlaceholderText('Password').type('pass');
    cy.findByText('Sign In').click();
    cy.wait(500);
    cy.location('pathname').should('eq', '/myjournal');
    cy.findByTestId('title1').should('have.text', 'Title1');
  });
});
