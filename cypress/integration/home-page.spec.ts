describe('Home Page Tests', () => {
  it('Checks Correct Title is Displayed', () => {
    cy.visit('http://localhost:8000');

    cy.contains('Welcome');
  });
});
