/* eslint-disable jest/expect-expect */
describe('calendar journal app', () => {
  it('should creat a new entry', () => {
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
