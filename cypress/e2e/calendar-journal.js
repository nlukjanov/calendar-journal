/* eslint-disable jest/expect-expect */
describe('calendar journal app', () => {
  it('should start at the landing page', () => {
    cy.visit('/');
    cy.findByTestId('landing').should('have.text', 'Hello');
    cy.findByText('Home');
    cy.findByTestId('nav');
    cy.findByText('Sign in');
    cy.findByText('Sign up');
  });

  it('should direct to signup', () => {
    cy.visit('/');
    cy.findByText('Sign up').click();
    cy.findByLabelText('Username');
    cy.findByLabelText('Email');
    cy.findByLabelText('Password');
    cy.findByLabelText('Password Confirmation');
    cy.findByPlaceholderText('Username');
    cy.findByPlaceholderText('Email');
    cy.findByPlaceholderText('Password');
    cy.findByPlaceholderText('Password Confirmation');
    cy.findByText('Sign Up');
  });
});
