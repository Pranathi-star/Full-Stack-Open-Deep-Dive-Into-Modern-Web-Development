describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('Blogs')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('username')
      cy.get('input:last').type('password')  
      cy.contains('login').click()
    })
    it('fails with incorrect credentials', function() {
      cy.get('input:first').type('user')
      cy.get('input:last').type('password')  
      cy.contains('login').click()
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('input:first').type('username')
      cy.get('input:last').type('password')  
      cy.contains('login').click()
    })
  
    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author') 
      cy.get('#url').type('test url')   
      cy.contains('save').click()
      cy.contains('test title')
    })

    it('A blog can be liked', function() {
      cy.get('#viewButton').click()
      cy.contains('like').click()
    })

    it('Blogs are in descending order of likes', function() {
      cy.get('#viewButton').click()
      cy.contains('like').click()
      cy.get('.blog').eq(0).should('contain', 'sssssssss')
      cy.get('.blog').eq(1).should('contain', 'test title')
    })

  })  
})
