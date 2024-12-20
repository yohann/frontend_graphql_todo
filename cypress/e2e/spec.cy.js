describe('To-Do Application', () => {
  beforeEach(() => {
    // Visit the application
    cy.visit('http://localhost:3001'); // Change the URL to your application's URL
  });

  it('should create a new to-do item', () => {
    // Find the input field and type a new to-do item
    cy.get('[data-cy=new-task]').type('New To-Do Item{enter}');

    // Assert that the new to-do item is displayed in the list
    cy.get('[data-cy=task-item]').should('contain', 'New To-Do Item');
  });

  it('should edit an existing to-do item', () => {
    // Assume the to-do item to edit is the first one in the list
    cy.get('[data-cy=task-item]').first().as('firstTodo');

    // Double-click to edit
    cy.get('@firstTodo').find('[alt="edit"]').click();

    // Edit the to-do item
    cy.get('[data-cy=edit-input]').type('Updated To-Do Item{enter}');

    // Assert that the to-do item is updated
    cy.get('@firstTodo').should('contain', 'Updated To-Do Item');
  });

  it('should complete a to-do item', () => {
    // Assume the to-do item to complete is the first one in the list
    cy.get('[data-cy=task-item]').first().as('firstTodo');

    // Click the complete button or checkbox
    cy.get('@firstTodo').find('[data-cy=complete-checkbox]').click();

    // Assert that the to-do item is marked as completed
    cy.get('[data-cy=task-item]').should('not.exist');

    cy.get('[data-cy=filter-completed]').click();

    cy.get('[data-cy=task-item]').should('contain', 'New To-Do Item');
  });

  it('should delete a to-do item', () => {
    cy.get('[data-cy=filter-completed]').click();

    // Assume the to-do item to delete is the first one in the list
    cy.get('[data-cy=task-item]').first().as('firstTodo');

    // Click the delete button
    cy.get('@firstTodo').find('[data-cy=delete-button]').click();

    // Assert that the to-do item is removed from the list
    cy.get('[data-cy=task-item]').should('not.exist');
  });
});