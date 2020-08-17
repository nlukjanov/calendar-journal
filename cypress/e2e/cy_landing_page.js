/* eslint-disable jest/expect-expect */
describe('Landing page', () => {
  it('should start at the landing page', () => {
    cy.visit('/');
    cy.findByTestId('landing').should('have.text', 'Hello');
    cy.findByText('Home');
    cy.findByTestId('nav');
    cy.findByText('Sign in');
    cy.findByText('Sign up');
  });

  it('should display User\'s journal entries', () => {
    cy.visit('/signin');
    cy.findByLabelText('Email');
    cy.findByLabelText('Password');
    cy.findByPlaceholderText('Email').type('nik@mail.com');
    cy.findByPlaceholderText('Password').type('pass');
    cy.findByText('Sign In').click();
    cy.location('pathname').should('eq', '/myjournal');
    cy.findByTestId('title1').should('have.text', 'Title1');
  });
});
